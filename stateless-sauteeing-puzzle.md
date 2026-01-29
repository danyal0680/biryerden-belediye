# Fix GeoServer Layer Loading Issue - adaparselv1 and imarlı

## Problem Summary

On the live server, two layers (adaparselv1 and imarlı) fail to load while POI and kacakyapilar layers work correctly.

**Root Cause**: Configuration inconsistency in GeoServer URLs
- **Failing layers**: Use direct HTTP IP address `http://88.222.221.152:8080/geoserver/`
- **Working layers**: Use HTTPS proxy `https://gursu.birtespit.com/geoserver-proxy/`

**Why it fails on live**:
1. Mixed content blocking (HTTPS page loading HTTP resources)
2. CORS policy issues
3. Direct IP may not be accessible from client browsers
4. Browser security policies block insecure content

**Why it works locally**:
- Local development likely bypasses mixed content restrictions
- Direct network access to the GeoServer IP from local machine

## Solution Approach

**Use your own reverse proxy** at `api.biryerden.com/geoserver` instead of `gursu.birtespit.com/geoserver-proxy`. This provides:
- Full control over proxy configuration
- No dependency on external services
- Centralized API management
- Better security and monitoring capabilities

---

## Critical Files to Modify

### Frontend (Next.js - This Repo)
1. **[.env](module-project/.env)** - Update environment variable to use your API domain
2. **[MapContainer.js](module-project/src/app/(council_panel)/illegal-buildings/MapDetection/MapContainer.js:86)** - Already updated (uses env variable)
3. **[GetPolygonFeature.js](module-project/src/app/(council_panel)/illegal-buildings/components/GetPolygonFeature.js:31,68)** - Already updated (uses env variable)
4. **[createParcelNumberLayer.js](module-project/src/app/(council_panel)/illegal-buildings/utils/createParcelNumberLayer.js:7)** - Already updated (uses env variable)
5. **[MapContainer_backup.js](module-project/src/app/(council_panel)/illegal-buildings/MapDetection/MapContainer_backup.js:62)** - Already updated (uses env variable)

### Backend (Node.js/Express - api.biryerden.com)
6. **Your Express backend** - Add reverse proxy route for `/geoserver/*`

---

## Implementation Plan

### Part A: Frontend Changes (This Repo)

#### Step 1: Update Environment Variable
**File**: `module-project/.env`

**Current**:
```env
NEXT_PUBLIC_GEOSERVER_BASE_URL=https://gursu.birtespit.com/geoserver-proxy/birsav_bursagursu
```

**Change to**:
```env
NEXT_PUBLIC_GEOSERVER_BASE_URL=https://api.biryerden.com/geoserver/birsav_bursagursu
```

This points to your own API domain reverse proxy instead of the external gursu.birtespit.com.

**Note**: All JavaScript files have already been updated to use `process.env.NEXT_PUBLIC_GEOSERVER_BASE_URL`. You only need to change the URL in the .env file.

---

### Part B: Backend Changes (Node.js/Express Backend)

You need to set up a reverse proxy in your Node.js/Express backend at `api.biryerden.com` to forward GeoServer requests.

#### Step 2: Locate Your Express Application Files

First, find your backend project directory and main application file:

```bash
# Navigate to your backend project
cd /path/to/your/api.biryerden.com/backend

# Common file names for Express apps:
# - server.js
# - app.js
# - index.js
# - src/server.js
# - src/app.js
```

Look for the file that contains your Express app initialization (where you see `const app = express();` or similar).

#### Step 3: Install http-proxy-middleware

In your backend project directory:

```bash
# Using npm
npm install http-proxy-middleware

# Or using yarn
yarn add http-proxy-middleware

# Or using pnpm
pnpm add http-proxy-middleware
```

**Expected output**:
```
added 1 package, and audited X packages in Ys
```

#### Step 4: Add GeoServer Proxy Route to Your Express App

**Option A: Add directly to your main file (server.js/app.js)**

Open your main Express file and add the proxy configuration **before** your error handlers but **after** CORS middleware (if you have any):

```javascript
// At the top of the file, add the import
const { createProxyMiddleware } = require('http-proxy-middleware');

// ... your existing middleware (body-parser, cors, etc.)

// Add this BEFORE your routes or error handlers
// GeoServer reverse proxy - handles /geoserver/* requests
app.use('/geoserver', createProxyMiddleware({
    target: 'http://88.222.221.152:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/geoserver': '/geoserver', // Keep the /geoserver path
    },
    onProxyReq: (proxyReq, req, res) => {
        // Log requests for debugging (optional, remove in production if too verbose)
        console.log(`[GeoServer Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
        console.error('[GeoServer Proxy Error]', err);
        res.status(500).json({
            error: 'GeoServer proxy error',
            message: err.message
        });
    },
}));

// Important: Handle CORS preflight requests for GeoServer endpoints
app.options('/geoserver/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
});

// ... your existing routes and error handlers
```

**Option B: Create a separate proxy module (better for organization)**

Create a new file `routes/geoserver-proxy.js`:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

const geoserverProxy = createProxyMiddleware({
    target: 'http://88.222.221.152:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/geoserver': '/geoserver',
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[GeoServer Proxy] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        // Add CORS headers to response
        proxyRes.headers['access-control-allow-origin'] = '*';
        proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
        proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
    },
    onError: (err, req, res) => {
        console.error('[GeoServer Proxy Error]', err);
        res.status(500).json({
            error: 'GeoServer proxy error',
            message: err.message
        });
    },
    // Increase timeouts for large responses
    timeout: 60000, // 60 seconds
    proxyTimeout: 60000,
});

module.exports = geoserverProxy;
```

Then in your main `server.js` or `app.js`:

```javascript
const geoserverProxy = require('./routes/geoserver-proxy');

// ... your existing middleware

// Mount the GeoServer proxy
app.use('/geoserver', geoserverProxy);

// Handle OPTIONS requests
app.options('/geoserver/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
});

// ... your existing routes
```

**What this code does**:
- Intercepts all requests to `api.biryerden.com/geoserver/*`
- Forwards them to `http://88.222.221.152:8080/geoserver/*`
- Automatically handles CORS headers
- Provides error handling and logging
- Sets appropriate timeouts for large GeoServer responses

#### Step 5: Verify the Code Placement

Your Express app structure should look like this:

```javascript
const express = require('express');
const app = express();

// 1. Body parser and basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS middleware (if you have it)
const cors = require('cors');
app.use(cors());

// 3. Your custom middleware
// ... logging, auth, etc.

// 4. GeoServer proxy (ADD HERE) ⬅️
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/geoserver', createProxyMiddleware({ /* config */ }));
app.options('/geoserver/*', (req, res) => { /* CORS preflight */ });

// 5. Your API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// ... other routes

// 6. Error handlers (at the end)
app.use((err, req, res, next) => {
    // ... error handling
});

// 7. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### Step 6: Test Locally Before Deploying

Start your backend server locally:

```bash
# Development mode
npm run dev

# Or production mode
npm start

# Or with nodemon
nodemon server.js
```

**Expected console output**:
```
Server running on port 3000
```

**Test the proxy locally** (in a new terminal):

```bash
# Test if the proxy route exists (should return GeoServer response)
curl http://localhost:3000/geoserver/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetCapabilities

# Check for CORS headers
curl -I http://localhost:3000/geoserver/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetCapabilities
```

**Expected output**:
- XML response from GeoServer (WFS capabilities document)
- Status: 200 OK
- Headers should include `access-control-allow-origin: *`

**If you see errors**:
- `Cannot GET /geoserver/...` → Proxy middleware not registered correctly
- `502 Bad Gateway` → GeoServer IP not accessible from your backend server
- `ECONNREFUSED` → GeoServer is down or firewall blocking
- No CORS headers → Add the `onProxyRes` handler from Option B above

#### Step 7: Commit and Deploy to Production

```bash
# Stage changes
git add .

# Commit
git commit -m "Add GeoServer reverse proxy endpoint"

# Push to production
git push origin main  # or your production branch

# SSH into your production server and restart the backend
ssh your-server
cd /path/to/backend
pm2 restart api  # or however you manage your Node.js process
# or: systemctl restart your-backend-service
```

#### Step 8: Test Production Endpoint

After deploying, test the live proxy:

```bash
# Test WFS capabilities
curl https://api.biryerden.com/geoserver/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetCapabilities

# Test WMS (should return binary image data)
curl -I https://api.biryerden.com/geoserver/birsav_bursagursu/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=birsav_bursagursu:adaparselv1&BBOX=0,0,1,1&WIDTH=256&HEIGHT=256&SRS=EPSG:3857&FORMAT=image/png
```

**Expected results**:
- Status: `200 OK`
- `content-type: application/xml` (for WFS)
- `content-type: image/png` (for WMS)
- `access-control-allow-origin: *`
- No SSL errors
- Response time < 5 seconds

**Common deployment issues**:

| Issue | Symptoms | Solution |
|-------|----------|----------|
| 502 Bad Gateway | Proxy returns 502 | Check if GeoServer IP `88.222.221.152:8080` is accessible from production server. Test with: `curl http://88.222.221.152:8080/geoserver/web/` from production server |
| SSL/HTTPS errors | Mixed content warnings | Ensure your API domain has valid SSL certificate. Check with: `curl -I https://api.biryerden.com` |
| Timeout errors | Requests hang or timeout | Increase timeout settings in proxy config (see Step 4, Option B) |
| Module not found | `Cannot find module 'http-proxy-middleware'` | Run `npm install` on production server after deploying |
| Port already in use | `EADDRINUSE` | Stop existing backend process: `pm2 stop all` or `killall node` |

#### Step 9: Monitor Logs

Watch your backend logs to see proxy requests:

```bash
# If using PM2
pm2 logs api

# If using systemd
journalctl -u your-backend-service -f

# If using docker
docker logs -f backend-container

# Or tail log files
tail -f /var/log/your-backend/access.log
```

You should see log lines like:
```
[GeoServer Proxy] GET /geoserver/birsav_bursagursu/wms?SERVICE=WMS... -> /geoserver/birsav_bursagursu/wms
```

Once you see successful proxy logs and curl tests return 200 OK, **the backend is ready**. You can then proceed to update the frontend `.env` file.

#### Alternative: Nginx Reverse Proxy (if using Nginx in front of Node.js)

If you have Nginx in front of your Node.js backend, you can configure the proxy at the Nginx level instead:

Add this to your Nginx config (usually `/etc/nginx/sites-available/api.biryerden.com`):

```nginx
# GeoServer reverse proxy
location /geoserver/ {
    proxy_pass http://88.222.221.152:8080/geoserver/;

    # CORS headers
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;

    # Handle OPTIONS requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }

    # Proxy headers
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Timeouts for large data transfers
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Buffer settings for image tiles
    proxy_buffering on;
    proxy_buffer_size 4k;
    proxy_buffers 8 4k;
}
```

After editing Nginx config:
```bash
sudo nginx -t  # Test configuration
sudo systemctl reload nginx  # Apply changes
```

---

## Technical Details

### WMS vs WFS Layers

**WMS Layers** (adaparselv1, imarlı):
- Raster tile-based rendering
- Uses OpenLayers `TileWMS` source
- Requests image tiles from GeoServer
- Format: PNG images served as map tiles

**WFS Layers** (kacakyapilar, onemli_noktalar):
- Vector feature-based rendering
- Fetches GeoJSON data via WFS GetFeature
- Client-side rendering with OpenLayers
- Format: JSON feature collections

Both protocols must use the same proxy URL for consistency.

### URL Pattern Consistency

After fix, all GeoServer requests will follow:
```
https://api.biryerden.com/geoserver/birsav_bursagursu/{wms|wfs}?parameters
```

This ensures:
- HTTPS security
- Proper CORS handling via your own proxy
- Centralized API management
- No mixed content issues
- No dependency on external services (gursu.birtespit.com)

---

## Verification Plan

### 1. Test Backend Proxy (Do This First!)

Before deploying the frontend, verify your backend proxy works:

```bash
# Test WMS endpoint (should return an image)
curl -I https://api.biryerden.com/geoserver/birsav_bursagursu/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=birsav_bursagursu:adaparselv1&BBOX=0,0,1,1&WIDTH=256&HEIGHT=256&SRS=EPSG:3857&FORMAT=image/png

# Test WFS endpoint (should return JSON)
curl https://api.biryerden.com/geoserver/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetCapabilities
```

**Expected results**:
- Status 200 OK
- CORS headers present (`Access-Control-Allow-Origin: *`)
- No authentication errors
- Content-Type: image/png (WMS) or application/xml (WFS)

**If proxy isn't working**:
- Check backend logs for proxy errors
- Verify GeoServer IP `88.222.221.152:8080` is accessible from your backend server
- Check firewall rules
- Verify Nginx/Express configuration is correct

### 2. Local Frontend Testing

After backend proxy is working:

```bash
# Update environment variable in .env
NEXT_PUBLIC_GEOSERVER_BASE_URL=https://api.biryerden.com/geoserver/birsav_bursagursu

# Restart development server
cd module-project
npm run dev
```

Test in browser:
- Navigate to illegal buildings detection map
- Open DevTools → Network tab
- Verify requests go to `api.biryerden.com/geoserver`
- Verify adaparselv1 layer loads (parcel boundaries visible)
- Verify imarlı layer loads (planning status visible)
- Click on map parcels - feature info should appear
- Zoom in - parcel numbers should render
- Compare with kacakyapilar and POI layers (should all work)

### 3. Production Deployment Testing

After deploying frontend:

1. **Network Tab Verification**:
   - Open browser DevTools → Network tab
   - Navigate to the map module
   - Filter by "geoserver"
   - Verify all requests use `https://api.biryerden.com/geoserver/`
   - Check for:
     - No HTTP requests to `88.222.221.152`
     - All requests return status 200
     - Response content-type correct (image/png for WMS, application/json for WFS)

2. **Console Checks** - No errors related to:
   - "Mixed Content: The page was loaded over HTTPS, but requested an insecure resource"
   - "CORS policy: No 'Access-Control-Allow-Origin' header"
   - Failed to load resource (net::ERR_BLOCKED_BY_CLIENT)

3. **Functional Testing**:
   - Layer visibility toggles work
   - Click interactions show feature info
   - Parcel number labels render at high zoom levels
   - Detection layer proximity searches work
   - Map panning and zooming is smooth (tiles load quickly)

### 4. Performance Monitoring

Monitor backend logs to ensure proxy is handling requests efficiently:
```bash
# Watch backend logs for GeoServer proxy requests
tail -f /path/to/your/backend/logs
```

Look for:
- Request counts
- Response times
- Any 500 or timeout errors
- Memory usage (GeoServer responses can be large)

---

## Risk Assessment

**Low Risk Changes**:
- URL replacements are straightforward string substitutions
- Uses environment variable with fallback for safety
- No logic changes to layer rendering or data processing
- Aligns with existing working pattern (WFS layers already use proxy)

**Rollback Plan**:
If issues occur, revert the four files to use direct IP for local testing:
```javascript
baseApi: "http://88.222.221.152:8080/geoserver/birsav_bursagursu"
```

---

## Additional Notes

### Why Environment Variable is Recommended

**Benefits**:
1. **Environment-specific configs**: Different URLs for dev/staging/production
2. **Security**: No hardcoded server IPs in code
3. **Maintainability**: Single source of truth
4. **Flexibility**: Easy to switch GeoServer instances

**Alternative (if not using env vars)**:
Simply replace all instances with the proxy URL string:
```javascript
"https://gursu.birtespit.com/geoserver-proxy/birsav_bursagursu"
```

### Reverse Proxy Benefits

**Why use your own proxy instead of direct GeoServer access**:

1. **Security**:
   - GeoServer IP is not exposed to clients
   - Can add authentication/rate limiting at proxy level
   - Centralized access control

2. **Performance**:
   - Can add caching for frequently requested tiles
   - Reduces load on GeoServer
   - Better control over timeouts and buffering

3. **Flexibility**:
   - Easy to switch GeoServer instances
   - Can route to different GeoServers based on request
   - Centralized logging and monitoring

4. **Maintenance**:
   - Single point of configuration
   - No client-side changes needed when GeoServer moves
   - Better error handling and custom error messages

### Optional: Add Caching for Better Performance

GeoServer WMS tiles rarely change, so caching can dramatically improve performance:

**Express with node-cache**:
```javascript
const NodeCache = require('node-cache');
const tileCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

app.use('/geoserver', createProxyMiddleware({
    target: 'http://88.222.221.152:8080',
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
        // Cache WMS image tiles
        if (req.url.includes('SERVICE=WMS') && req.url.includes('GetMap')) {
            res.set('Cache-Control', 'public, max-age=3600');
        }
    },
}));
```

**Nginx caching**:
```nginx
# Add to nginx.conf or site config
proxy_cache_path /var/cache/nginx/geoserver levels=1:2 keys_zone=geoserver_cache:10m max_size=1g inactive=60m;

location /geoserver/ {
    proxy_pass http://88.222.221.152:8080/geoserver/;

    # Enable caching for WMS GetMap requests
    proxy_cache geoserver_cache;
    proxy_cache_valid 200 1h;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    add_header X-Cache-Status $upstream_cache_status;

    # ... rest of config
}
```

### Security Considerations

**Important**: The example proxy configuration allows all origins (`Access-Control-Allow-Origin: *`). For production, consider:

1. **Restrict CORS to your domains**:
   ```javascript
   headers: {
       'Access-Control-Allow-Origin': 'https://biryerden.com',
       // Or use a whitelist check
   }
   ```

2. **Add rate limiting** to prevent abuse:
   ```javascript
   const rateLimit = require('express-rate-limit');

   const geoserverLimiter = rateLimit({
       windowMs: 1 * 60 * 1000, // 1 minute
       max: 100, // Limit each IP to 100 requests per minute
   });

   app.use('/geoserver', geoserverLimiter, createProxyMiddleware({ ... }));
   ```

3. **Add authentication** if GeoServer contains sensitive data:
   ```javascript
   app.use('/geoserver', requireAuth, createProxyMiddleware({ ... }));
   ```

4. **Monitor and log** suspicious activity:
   ```javascript
   onProxyReq: (proxyReq, req, res) => {
       logger.info('GeoServer request', {
           ip: req.ip,
           url: req.url,
           userAgent: req.get('user-agent'),
       });
   }
   ```

---

## Summary

### Frontend Changes
**Files to modify**: 1 file (`.env` only - other files already updated)
**Lines modified**: 1 line
**Impact**: Points to your own API proxy instead of external service

### Backend Changes
**New code**: Add reverse proxy route (~20-30 lines)
**Impact**: Securely proxies GeoServer requests through your API domain

### Overall Impact
- ✅ Fixes layer loading issue completely
- ✅ Eliminates dependency on gursu.birtespit.com
- ✅ Centralizes GeoServer access through your API
- ✅ Enables better monitoring and security controls
- ✅ No changes needed to frontend code logic (just env variable)

### Deployment Steps
1. **Backend first**: Deploy proxy route to api.biryerden.com
2. **Test proxy**: Verify endpoints work with curl
3. **Frontend**: Update .env and deploy Next.js app
4. **Verify**: Check Network tab shows requests to api.biryerden.com

### Potential Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Proxy returns 502 Bad Gateway | GeoServer unreachable from backend | Check network connectivity, firewall rules |
| CORS errors persist | Proxy headers not set | Verify CORS headers in proxy config |
| Slow tile loading | No buffering/caching | Enable proxy buffering in Nginx or add caching layer |
| 504 Gateway Timeout | Large WFS queries timeout | Increase proxy timeout settings |
| Mixed content warning | Proxy uses HTTP not HTTPS | Ensure SSL certificate on api.biryerden.com |
