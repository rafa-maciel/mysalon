import Component from "./Component";

export default class DashboardPageLayout extends Component {
    constructor(parentNode) {
        super(parentNode);
    }

    get sidebarNavSelector() {
        return '.layout-nav-sidebar';
    }

    addTopbarComponents(...components) {
        let topbarEl = document.querySelector(".navbar.topbar");
        topbarEl.innerHTML = "";
        
        components.forEach(el => {topbarEl.appendChild(el)});
    }


    _base(info) {
        return `
            <!-- Page Wrapper -->
            <div id="wrapper">
                
                
                <!-- Sidebar -->
                <div class="layout-nav-sidebar">
        
                </div>
                <!-- End of Sidebar -->
            
                <!-- Content Wrapper -->
                <div id="content-wrapper" class="d-flex flex-column">
            
                <!-- Main Content -->
                <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow buttons-menu-bar justify-content-end">
                
                </nav>
                <!-- End of Topbar -->
            
                <!-- Begin Page Content -->
                <div class="container-fluid main-content">
                </div>
                <!-- /.container-fluid -->
            
                </div>
                <!-- End of Main Content -->
            
                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; MySaloon 2020 - @RafaMaciel</span>
                    </div>
                    </div>
                </footer>
                <!-- End of Footer -->
            
                </div>
                <!-- End of Content Wrapper -->
            
            </div>
            <!-- End of Page Wrapper -->
        `;
    }
}