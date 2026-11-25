const ADMIN_ORIGIN="https://mahisagar-college-admin.itcell-meet.workers.dev";
export default {
 async fetch(request,env){
  const u=new URL(request.url),p=u.pathname;
  if(p==="/admin"||p==="/admin.html"||p.startsWith("/admin/")||u.searchParams.get("admin")==="1")return Response.redirect(ADMIN_ORIGIN+"/admin/",302);
  if(p==="/cms-data.json"||p.startsWith("/cms-uploads/")){
   if(!["GET","HEAD"].includes(request.method))return new Response("Method not allowed",{status:405,headers:{Allow:"GET, HEAD"}});
   const target=new URL(p+u.search,ADMIN_ORIGIN);
   const response=await env.ADMIN_CMS.fetch(new Request(target,{method:request.method,headers:{Accept:request.headers.get("Accept")||"*/*"}}));
   const headers=new Headers(response.headers);headers.delete("Set-Cookie");if(p==="/cms-data.json")headers.set("Cache-Control","no-store, max-age=0");
   return new Response(response.body,{status:response.status,headers});
  }
  return env.ASSETS.fetch(request);
 }
};
