import { Search } from "lucide-react"

const SideBar = () => {
  return (
    <div className="bg-black border-r w-full sm:w-90 h-screen p-3 pt-10">
      <section aria-label="sidebar_browse">
        <div>
          <div className="sidebar_logo hidden sm:block w-60" >
            <img src="src/assets/irysocial_logo.png" alt="" />
          </div>
          <div className="sidebar_search">
            <Search color="#ffffff" />
            <input type="text" name="" id="" placeholder="Search Creators" />
          </div>
        </div>

      </section>
      <section className="sidebar_more">

      </section>
      <section className="sidebar_profile">

      </section>

      
    </div>
  )
}

export default SideBar