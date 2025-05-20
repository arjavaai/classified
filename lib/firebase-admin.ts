import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for server-side operations
function getFirebaseAdminApp() {
  const apps = getApps();
  
  if (apps.length > 0) {
    return apps[0];
  }
  
  // For debugging
  console.log('Firebase environment variables check:');
  console.log('PROJECT_ID exists:', !!process.env.FIREBASE_PROJECT_ID);
  console.log('CLIENT_EMAIL exists:', !!process.env.FIREBASE_CLIENT_EMAIL);
  console.log('PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);
  
  // Use environment variables if available
  if (process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY) {
    
    // Make sure to properly parse the private key
    // The key is stored with "\n" in the .env file but needs actual newlines
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      })
    });
  }
  
  // Fallback to hardcoded values for development
  console.log('Using fallback Firebase credentials');
  return initializeApp({
    credential: cert({
      projectId: 'skluva',
      clientEmail: 'firebase-adminsdk-fbsvc@skluva.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDscIqBEWgNSwR0\nNm5i1XXLuShJNRw48JnJ/QWJmBgUXq+wZZl70PnbGmcHWE3uZNMdMir/oOcue3H2\nuulM88yGhs7PKMpoAqzoCVsS/eVyavcvVSlgp2XiDAdUQkpxRTNxAWY8kX9es0Sn\n/z894zfjIPCkbco3WipMoXFpKsZgtpGFVxfOOa1l0ZmUsGfe6CaN86prNthd7eG2\ngKVbpk83Wpdf+H5Z38OvB2k01MTFeGIzM7Iz+JPgcQk/0IMKmVD8DkrwEjrnr5AJ\nz4ya99XxHUfC0m5lnh1EZN/K5Y2LDQHGZJ21ADOBcx75ucerujqxaKNFdUP47Kdg\nrGhBkoXDAgMBAAECggEAEvXdbYc/UF2VMFqTFJLonNsuy1wadMh6lLOZJ5UOTUfg\nj+U93yt9deASpgijSzxDn8I/p3s4PsaAd5g6kES2wIz79angPWIFiqABcS7yIPBJ\n/T43kLwr0+pCBjRAsv+pJeVGVRIX5Di9BznVUPmxKCIimhUB09mDrdx+c0AOY3/p\nA7dmlzemBdhRBskaeTb6yZf04TU8ox9BADtVQjnGrYamI9EHQr9jU61WOHdjMgcv\nPf3YMCKQLB64IEpJgJuclQJS7tgxrGW1Rj2e6NRpxw9SqZVDLVjX7o2/cJoMz2YR\nIu+Y29VnqJ5lGEoMTdcSv4hIrhPs0JIgZKAK6nY8fQKBgQD/mA0V6/Rs33piQrvv\nMfMf8fQKmih64YP6tBCuqmkpJFGxbW4QGZ1i3VBS0CLU/KFkDzRtMOT6Rg1JTHiu\n+oEYG03232WtdoEfx4AD5LVq2Fz8FM6IF63DfpfphoZGa7jS7sO6X6Pec+2ASGYs\nZgGTYZVTGV6kTCn4s5RBHtkgPQKBgQDs0LMu/ACnysmL+YOYfh+4hbOQRRRpsedN\ncv3ulEETHHHDwQrUKkJTa6huNEupCT3O6CbQZjDidzOJ1RLQrr2JonqgPaDDe31R\nQc3oNke/OL/ScWXxIyU2dlgtj63/tvjGeqcC4IoF/nF97PdRuXChVu+H4T0vAb1N\nMYSbCv6d/wKBgCJX5fo6GD/Az4sAeIwtZAO42RfLmwDX6In5Q/yUPUkf7jIvCAj1\nyCYOospd2TBROcZeHKdHWJ0gaIyez+CDHHGGybUQU3M5ZyREBDmBs7bFl8jvasjy\nlZCdJABm6QfxVYZSOs6CJ1yuqwz/rWrt0exhwlTGJedhrIoUZylQ4c/pAoGAPzxL\nXJR2KFgCEZqDBUlIdyFcnX2UwdR7izbVj8uOxOeniToXBihypYvt4d+dBHovQvzC\nwItJKm/iF0AKUicW/ZWhYQCT2R80i2oi7YrxBaLFthAJxKY53Z0kVqYzNEFLlNRT\nnHUQ5iDXdWS9ddkqtipcs8/1YoP4ZJCAdFYvP0kCgYEA/bRWYjID41BfSSZ4VfbK\n1iC70kz65mb0MMazmw+YhngAUCZo7nECwVO1HTmsaZdrpcjg9aq4k0rTNU4fVWWC\n0UuPzNEyCHmAJ1Fii4iTVpeYRJ1cghLxA+Hp6QWjxK+Doxu9ZD/GQdsCUlVo04ti\nf4uEfGHhJPnJDGFJ87u8RmE=\n-----END PRIVATE KEY-----\n',
    })
  });
}

// Get Firestore instance
const adminDb = getFirestore(getFirebaseAdminApp());

export { adminDb };
