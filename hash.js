import bcrypt from 'bcrypt';

async function checkPassword(plainPassword, dbHash) {
    // plainPassword: İstifadəçinin daxil etdiyi (məs: '123456')
    // dbHash: Bazadan gələn ($2a$10$....)
    
    const isMatch = await bcrypt.compare(plainPassword, dbHash);
    
    if (isMatch) {
        console.log("✅ Şifrə doğrudur!");
    } else {
        console.log("❌ Şifrə səhvdir!");
    }
}

// Test etmək üçün bazadakı hash-i bura qoyub yoxlayın:
checkPassword('1234bursa123Nilufer!', '$2b$10$/mEkliBO1O8iaJI//um5xuTgFQl9e0GHmnoShU1H7hAyf8RUd4YRy');