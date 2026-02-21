// 缓存名称
const CACHE_NAME = 'rent-manager-v1';
// 需要缓存的文件
const CACHE_FILES = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// 安装阶段：缓存所有文件
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 拦截请求：优先使用缓存（实现离线可用）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});