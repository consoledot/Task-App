const cacheName = 'v1'

//Install Servive Worker 
self.addEventListener("install", ()=>{
    console.log("Service worker Install")
})

//Activate Service Worker 
self.addEventListener("activate", (e)=>{
    console.log("Service worker Activated")
    e.waitUntil(
        caches.keys()
            .then(cacheName=>{
                return Promise.all(
                    cacheName.map(cache =>{
                        if(cache !== cacheName){
                            return caches.delete(cache)
                        }
                    })
                )
            }) 
    )
})

//Fetch Catche
self.addEventListener("fetch", (e)=>{
    console.log("Service worker Fetching....")
    e.respondWith(
        fetch(e.request)
            .then(res =>{
                const reponseClone = res.clone()
                caches.open(cacheName)
                    .then(cache =>{
                        cache.put(e.request, reponseClone)
                    })
                    return res
            })
            .catch(err => caches.match(e.request)
                .then(res => res)
            )
    )
})