import React from "react";

function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
            <img src={"dist/img/AdminLTELogo.png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}} />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src={"dist/img/user2-160x160.jpg"} className="img-circle elevation-2"/>
                </div>
                <div className="info">
                    <a href="#" className="d-block">Alexander Pierce</a>
                </div>
            </div>


            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              
                <li className="nav-header">EXAMPLES</li>
                
                <li className="nav-item">
                    <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image"></i>
                    <p>
                        Gallery
                    </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="pages/kanban.html" className="nav-link">
                    <i className="nav-icon fas fa-columns"></i>
                    <p>
                        Kanban Board
                    </p>
                    </a>
                </li>
                
                </ul>
            </nav>
        </div>
    </aside>
    
    );
}

export default Sidebar;