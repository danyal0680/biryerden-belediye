# Frontend GeoServer URL Dəyişikliyi

## MapContainer.js faylında 2 URL dəyişməlidir:

### 1. WMS baseApi (təxminən 86-cı sətir)

**Köhnə:**
```javascript
baseApi: "http://88.222.221.152:8080/geoserver/birsav_bursagursu",
```

**Yeni:**
```javascript
baseApi: "https://api.biryerden.com/geoserver/birsav_bursagursu",
```

### 2. WFS_URL (təxminən 90-cı sətir)

**Köhnə:**
```javascript
WFS_URL: "https://gursu.birtespit.com/geoserver-proxy/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=birsav_bursagursu:kacakyapilar&outputFormat=application/json&srsName=EPSG:4326",
```

**Yeni:**
```javascript
WFS_URL: "https://api.biryerden.com/geoserver/birsav_bursagursu/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=birsav_bursagursu:kacakyapilar&outputFormat=application/json&srsName=EPSG:4326",
```

---

## Digər fayllarda da `88.222.221.152:8080` və ya `gursu.birtespit.com/geoserver-proxy` varsa, hamısını `api.biryerden.com/geoserver` ilə əvəz edin.

## Backend hazırdır
Nginx config-də `api.biryerden.com/geoserver/*` sorğuları `http://88.222.221.152:8080/geoserver/*` adresinə proxy olunur. Frontend dəyişiklikdən sonra network tab-da yalnız `api.biryerden.com` görünəcək.