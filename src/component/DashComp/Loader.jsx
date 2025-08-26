const Loader = () => {

      const loader = [
        {
          w: "w-72",
        },
         {
          w: "w-72",
        },
         {
          w: "w-72",
        },
    ]
    return ( 
        <>
        <section>
        <div className="mx-6 my-4 flex flex-wrap">
             {loader.map((item, index) => {
          return (
            <>
            <div className="w-60 p-3">
                    <div class="skeleton-loader p-3">
                    <div class="skeleton-line h-10 w-10 rounded-full"></div>
                    <div class="skeleton-line h-3 w-20 rounded-full"></div>
                    <div class="skeleton-line h-3 w-10 mt-2 rounded-full"></div>
                    <div class="skeleton-line h-3 w-60 mt-4 rounded-full"></div>
                </div>
                </div>
            </>
            );
        })}
</div>
        </section>
        </>
     );
}
 
export default Loader;