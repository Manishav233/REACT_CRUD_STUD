import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <ul class="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Student Panel</div>
            </a>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider my-0" />
            
            {/* <!-- Heading --> */}
            {/* <div class="sidebar-heading">
                Addons
            </div> */}
            {/* <!-- Nav Item - Charts --> */}
            <li class="nav-item">
                <Link class="nav-link" to="/students-info">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span className="text-light font-weight-bold">Students</span></Link>
            </li>

            {/* <!-- Nav Item - Tables --> */}
            <li class="nav-item">
                <Link class="nav-link" to="/teachers-info">
                    <i class="fas fa-fw fa-table"></i>
                    <span className='text-light font-weight-bold'>Techers</span></Link>
            </li>

        </ul>
    )
}

export default Sidebar