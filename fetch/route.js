var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const api = require('../Services/index.service');
const multer = require("multer");
const uuid = require("uuid");
let Util = require('../util/index');
const bcrypt = require('bcryptjs');

/**
 *
 * Upload Product picture
 *
 */

let storage = multer.diskStorage({
      //multers disk storage settings
      destination: function (req, file, cb) {
            cb(null, "./public/assets/uploads/images/admin");
      },
      filename: function (req, file, cb) {
            let datetimestamp = Date.now();
            const tempFileName =
                  file.fieldname +
                  "-" +
                  uuid.v4() +
                  "." +
                  file.originalname.split(".")[file.originalname.split(".").length - 1];
            req.fileUrl = tempFileName;
            cb(null, tempFileName);
      },
});

let upload = multer({
      storage: storage,
      limits: {
            fileSize: 2097152, // in bytes 2MB
      },
      onFileUploadStart: function (file) {
            const fileMime = file.mimetype;
            const fileMimeSplit = fileMime.split("/");
            if (fileMimeSplit[0] == "image") {
                  cb(null, true);
            } else {
                  cb(new Error("Please upload only jpg|jpeg|png."));
            }
      },
}).single('profile_Image');



module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }
      }

      app.get('/dashboard-blog', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Dashboard' };
            res.render('Dashboard/dashboard-blog');
      });

      app.get('/dashboard-saas', isUserAllowed, function (req, res) {
            res.locals = { title: 'Saas Dashboard' };
            res.render('Dashboard/dashboard-saas');
      });

      app.get('/dashboard-crypto', isUserAllowed, function (req, res) {
            res.locals = { title: 'Crypto Dashboard' };
            res.render('Dashboard/dashboard-crypto');
      });

      app.get('/', isUserAllowed, async function (req, res) {
            res.locals = { title: 'Dashboard' };
            let dashboard = await api.DashboardService.fetchDashboards();
            res.render('Dashboard/index', {  user: req.session.user,dashboard: dashboard.data.data.dashboard, 'message': req.flash('message'), 'error': req.flash('error') });
      });

      // Layouts
      app.get('/layouts-horizontal', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal' };
            res.render('Dashboard/index', { layout: 'layoutsHorizontal' });
      });
      app.get('/layouts-light-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Light Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsLightSidebar' });
      });
      app.get('/layouts-compact-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Compact Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsCompactSidebar' });
      });
      app.get('/layouts-icon-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Icon Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsIconSidebar' });
      });
      app.get('/layouts-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsBoxed' });
      });
      app.get('/layouts-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsPreloader' });
      });
      app.get('/layouts-colored-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsColoredSidebar' });
      });
      app.get('/layouts-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Scrollable' };
            res.render('Dashboard/index', { layout: 'layoutsScrollable' });
      });

      app.get('/layouts-h-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsHBoxed' });
      });
      app.get('/layouts-h-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsHPreloader' });
      });
      app.get('/layouts-h-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Scrollable' };
            res.render('Dashboard/index', { layout: 'layoutsHScrollable' });
      });
      app.get('/layouts-h-colored', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Topbar' };
            res.render('Dashboard/index', { layout: 'layoutsHColored' });
      });
      app.get('/layouts-h-topbar-light', isUserAllowed, function (req, res) {
            res.locals = { title: 'Topbar Light' };
            res.render('Dashboard/index', { layout: 'layoutsHTopbarLight' });
      });

      // Color Theme vertical
      app.get("/vertical-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Dark' };
            res.render("Dashboard/index", { layout: "vertical-dark-layout" });
      });

      app.get("/vertical-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Rtl' };
            res.render("Dashboard/index", { layout: "vertical-rtl-layout" });
      });

      // Color Theme Horizontal
      app.get("/horizontal-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Dark' };
            res.render("Dashboard/index", { layout: "horizontal-dark-layout" });
      });

      app.get("/horizontal-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Rtl' };
            res.render("Dashboard/index", { layout: "horizontal-rtl-layout" });
      });

      // Calendar
      app.get('/calendar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Calendar' };
            res.render('Calendar/calendar');
      });
      app.get('/calendar-full', isUserAllowed, function (req, res) {
            res.locals = { title: 'Full Calendar' };
            res.render('Calendar/calendar-full');
      });

      // Chat
      app.get('/chat', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chats' };
            res.render('Chats/chat');
      });

      // File Manager
      app.get('/apps-filemanager', isUserAllowed, function (req, res) {
            res.locals = { title: 'File Manager' };
            res.render('File/apps-filemanager');
      });


      // Ecomerce
      app.get('/ecommerce-products', isUserAllowed, function (req, res) {
            res.locals = { title: 'Products' };
            res.render('Ecommerce/ecommerce-products');
      });
      app.get('/ecommerce-product-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Product Detail' };
            res.render('Ecommerce/ecommerce-product-detail');
      });
      app.get('/ecommerce-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Ecommerce/ecommerce-orders');
      });
      app.get('/ecommerce-customers', isUserAllowed, function (req, res) {
            res.locals = { title: 'Customers' };
            res.render('Ecommerce/ecommerce-customers');
      });
      app.get('/ecommerce-cart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cart' };
            res.render('Ecommerce/ecommerce-cart');
      });
      app.get('/ecommerce-checkout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Checkout' };
            res.render('Ecommerce/ecommerce-checkout');
      });
      app.get('/ecommerce-shops', isUserAllowed, function (req, res) {
            res.locals = { title: 'Shops' };
            res.render('Ecommerce/ecommerce-shops');
      });
      app.get('/ecommerce-add-product', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Product' };
            res.render('Ecommerce/ecommerce-add-product');
      });

      // Crypto
      app.get('/crypto-wallet', isUserAllowed, function (req, res) {
            res.locals = { title: 'Wallet' };
            res.render('Crypto/crypto-wallet');
      });
      app.get('/crypto-buy-sell', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buy/Sell' };
            res.render('Crypto/crypto-buy-sell');
      });
      app.get('/crypto-exchange', isUserAllowed, function (req, res) {
            res.locals = { title: 'Exchange' };
            res.render('Crypto/crypto-exchange');
      });
      app.get('/crypto-lending', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lending' };
            res.render('Crypto/crypto-lending');
      });
      app.get('/crypto-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Crypto/crypto-orders');
      });
      app.get('/crypto-kyc-application', isUserAllowed, function (req, res) {
            res.locals = { title: 'KYC Application' };
            res.render('Crypto/crypto-kyc-application');
      });


      // Email
      app.get('/email-inbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Inbox' };
            res.render('Email/email-inbox');
      });
      app.get('/email-read', isUserAllowed, function (req, res) {
            res.locals = { title: 'Read Email' };
            res.render('Email/email-read');
      });
      app.get('/email-template-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Basic Action' };
            res.render('Email/Templates/email-template-basic');
      });
      app.get('/email-template-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alert Email' };
            res.render('Email/Templates/email-template-alert');
      });
      app.get('/email-template-billing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Billing Email' };
            res.render('Email/Templates/email-template-billing');
      });

      // Invoices
      app.get('/invoices-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoices List' };
            res.render('Invoice/invoices-list');
      });
      app.get('/invoices-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoices Detail' };
            res.render('Invoice/invoices-detail');
      });

      ///Projects
      app.get('/projects-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Grid' };
            res.render('Projects/projects-grid');
      });
      app.get('/projects-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects List' };
            res.render('Projects/projects-list');
      });
      app.get('/projects-overview', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Overview' };
            res.render('Projects/projects-overview');
      });
      app.get('/projects-create', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Create' };
            res.render('Projects/projects-create');
      });

      // Tasks
      app.get('/tasks-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tasks List' };
            res.render('Tasks/tasks-list');
      });
      app.get('/tasks-kanban', isUserAllowed, function (req, res) {
            res.locals = { title: 'Kanban Board' };
            res.render('Tasks/tasks-kanban');
      });
      app.get('/tasks-create', isUserAllowed, function (req, res) {
            res.locals = { title: 'Create Task' };
            res.render('Tasks/tasks-create');
      });

      //contacts
      app.get('/contacts-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts User Grid' };
            res.render('Contacts/contacts-grid');
      });
      app.get('/contacts-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts User List' };
            res.render('Contacts/contacts-list');
      });
      app.get('/contacts-profile', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts Profile' };
            res.render('Contacts/contacts-profile');
      });

      //Blog
      app.get('/blog-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog List' };
            res.render('Blog/blog-list');
      });
      app.get('/blog-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Grid' };
            res.render('Blog/blog-grid');
      });
      app.get('/blog-details', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Details' };
            res.render('Blog/blog-details');
      });


      // Pages
      app.get('/pages-starter', isUserAllowed, function (req, res) {
            res.locals = { title: 'Starter Page' };
            res.render('Pages/pages-starter');
      });
      app.get('/pages-timeline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Timeline' };
            res.render('Pages/pages-timeline');
      });
      app.get('/pages-faqs', isUserAllowed, function (req, res) {
            res.locals = { title: 'FAQs' };
            res.render('Pages/pages-faqs');
      });
      app.get('/pages-pricing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Pricing' };
            res.render('Pages/pages-pricing');
      });

      // UI
      app.get('/ui-alerts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alerts' };
            res.render('Ui/ui-alerts');
      });
      app.get('/ui-buttons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buttons' };
            res.render('Ui/ui-buttons');
      });
      app.get('/ui-cards', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cards' };
            res.render('Ui/ui-cards');
      });
      app.get('/ui-carousel', isUserAllowed, function (req, res) {
            res.locals = { title: 'Carousel' };
            res.render('Ui/ui-carousel');
      });
      app.get('/ui-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Grid' };
            res.render('Ui/ui-grid');
      });
      app.get('/ui-lightbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lightbox' };
            res.render('Ui/ui-lightbox');
      });
      app.get('/ui-modals', isUserAllowed, function (req, res) {
            res.locals = { title: 'Modals' };
            res.render('Ui/ui-modals');
      });
      app.get('/ui-offcanvas', isUserAllowed, function (req, res) {
            res.locals = { title: 'Off Canvas' };
            res.render('Ui/ui-offcanvas');
      });

      app.get('/ui-rangeslider', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rangeslider' };
            res.render('Ui/ui-rangeslider');
      });
      app.get('/ui-session-timeout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Session Timeout' };
            res.render('Ui/ui-session-timeout');
      });
      app.get('/ui-progressbars', isUserAllowed, function (req, res) {
            res.locals = { title: 'Progress Bars' };
            res.render('Ui/ui-progressbars');
      });
      app.get('/ui-placeholders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Placeholders' };
            res.render('Ui/ui-placeholders');
      });
      app.get('/ui-sweet-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sweet Alert' };
            res.render('Ui/ui-sweet-alert');
      });
      app.get('/ui-tabs-accordions', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tabs & Accordions' };
            res.render('Ui/ui-tabs-accordions');
      });
      app.get('/ui-typography', isUserAllowed, function (req, res) {
            res.locals = { title: 'Typography' };
            res.render('Ui/ui-typography');
      });
      app.get('/ui-toasts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Toasts' };
            res.render('Ui/ui-toasts');
      });
      app.get('/ui-video', isUserAllowed, function (req, res) {
            res.locals = { title: 'Video' };
            res.render('Ui/ui-video');
      });
      app.get('/ui-general', isUserAllowed, function (req, res) {
            res.locals = { title: 'General' };
            res.render('Ui/ui-general');
      });
      app.get('/ui-colors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colors' };
            res.render('Ui/ui-colors');
      });
      app.get('/ui-rating', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rating' };
            res.render('Ui/ui-rating');
      });
      app.get('/ui-notifications', isUserAllowed, function (req, res) {
            res.locals = { title: 'Notifications' };
            res.render('Ui/ui-notifications');
      });
      app.get('/ui-image-cropper', isUserAllowed, function (req, res) {
            res.locals = { title: 'Image Cropper' };
            res.render('Ui/ui-image-cropper');
      });
      app.get('/ui-images', isUserAllowed, function (req, res) {
            res.locals = { title: 'Images' };
            res.render('Ui/ui-images');
      });
      app.get('/ui-dropdowns', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dropdowns' };
            res.render('Ui/ui-dropdowns');
      });

      // Forms
      app.get('/form-elements', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Elements' };
            res.render('Form/form-elements');
      });
      app.get('/form-layouts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Layouts' };
            res.render('Form/form-layouts');
      });
      app.get('/form-validation', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Validation' };
            res.render('Form/form-validation');
      });
      app.get('/form-advanced', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Advanced' };
            res.render('Form/form-advanced');
      });
      app.get('/form-editors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Editors' };
            res.render('Form/form-editors');
      });
      app.get('/form-uploads', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Uploads' };
            res.render('Form/form-uploads');
      });
      app.get('/form-xeditable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Xeditable' };
            res.render('Form/form-xeditable');
      });
      app.get('/form-repeater', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Repeater' };
            res.render('Form/form-repeater');
      });
      app.get('/form-wizard', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Wizard' };
            res.render('Form/form-wizard');
      });
      app.get('/form-mask', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Mask' };
            res.render('Form/form-mask');
      });

      // Tables
      app.get('/tables-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Basic' };
            res.render('Tables/tables-basic');
      });
      app.get('/tables-datatable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Datatable' };
            res.render('Tables/tables-datatable');
      });
      app.get('/tables-responsive', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Responsive' };
            res.render('Tables/tables-responsive');
      });
      app.get('/tables-editable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Editable' };
            res.render('Tables/tables-editable');
      });

      // Charts
      app.get('/charts-apex', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Apex' };
            res.render('Charts/charts-apex');
      });
      app.get('/charts-echart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Echart' };
            res.render('Charts/charts-echart');
      });
      app.get('/charts-chartjs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Chartjs' };
            res.render('Charts/charts-chartjs');
      });
      app.get('/charts-flot', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Flot' };
            res.render('Charts/charts-flot');
      });
      app.get('/charts-tui', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Toast UI' };
            res.render('Charts/charts-tui');
      });
      app.get('/charts-knob', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts knob' };
            res.render('Charts/charts-knob');
      });
      app.get('/charts-sparkline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Sparkline' };
            res.render('Charts/charts-sparkline');
      });

      // Icons
      app.get('/icons-boxicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxicons' };
            res.render('Icons/icons-boxicons');
      });
      app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
            res.locals = { title: 'Material Design' };
            res.render('Icons/icons-materialdesign');
      });
      app.get('/icons-dripicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dripicons' };
            res.render('Icons/icons-dripicons');
      });
      app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
            res.locals = { title: 'Fontawesome' };
            res.render('Icons/icons-fontawesome');
      });

      // Maps
      app.get('/maps-google', isUserAllowed, function (req, res) {
            res.locals = { title: 'Google Maps' };
            res.render('Maps/maps-google');
      });
      app.get('/maps-vector', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vector Maps' };
            res.render('Maps/maps-vector');
      });
      app.get('/maps-leaflet', isUserAllowed, function (req, res) {
            res.locals = { title: 'Leaflet Maps' };
            res.render('Maps/maps-leaflet');
      });

      // User
      app.get('/users', isUserAllowed, function (req, res) {
            let users = [
                  {
                        id: 1,
                        name: "Satish Palsra",
                        position: "Sr Developer",
                        office: "Mohali",
                        age: "27",
                        startDate: "2011/04/25",
                        salary: "$320,800"
                  }
            ];
            res.locals = { title: 'Users' };
            res.render('User/users', { users: users });
      });
      app.get('/add-user', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add User' };
            res.render('User/add-user', { 'message': req.flash('message'), 'error': req.flash('error') });
      });
      app.get('/edit-user/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit User' };
            res.render('User/edit-user', { 'message': req.flash('message'), 'error': req.flash('error') });
      });

      // Profile
      app.get('/update-profile', isUserAllowed, function (req, res) {
            res.locals = { title: 'Update Profile', user: Util.cookie.getUser() };
            res.render('Profile/update-profile', { user: res.locals.user });
      });
      app.post('/update-profile', isUserAllowed, urlencodeParser, async function (req, res) {
            await upload(req, res, async function (err) {
                  if (err) {
                        return res.status(200).send({
                              status: false,
                              status_code: 200,
                              error: err,
                              error_fields: ["profile_Image"],
                              message: "Error in file size/extension.",
                        });
                  }
                  try {
                        let body = req.body;
                        if (req.hasOwnProperty("fileUrl")) {
                              let profile = "admin/" + req.fileUrl;
                              body.profileImage = profile
                        }
                        api.Auth.updateProfile(body).then((response) => {
                              if (response.data.status == true) {
                                    Util.cookie.setUser("user", response.data.data.user);
                                    req.flash('message', response.data.message);
                                    res.redirect('/');
                              }
                              if (response.data.status == false) {
                                    req.flash('error', response.data.message);
                                    res.redirect('/login');
                              }
                        }).catch((error) => {
                              req.flash('error', 'Something Went Wrong');
                              res.redirect('/login');
                        });
                  } catch (error) {
                        req.flash('error', 'Something Went Wrong');
                        res.redirect('/login');
                  }
            });
      })
      app.get('/change-password', isUserAllowed, function (req, res) {
            res.locals = { title: 'Change Password' };
            res.render('Profile/change-password', { 'message': req.flash('message'), 'error': req.flash('error') });
      });
      app.post('/change-password', isUserAllowed, urlencodeParser, function (req, res) {
            try {
                  let body = req.body;
                  if (body.newPassword != body.confirmPassword) {
                        req.flash('error', 'must match password confirmation.');
                        res.redirect('/change-password');
                  }
                  api.Auth.changePassword(body).then((response) => {
                        if (response.data.status == false) {
                              req.flash('error', response.data.message);
                              res.redirect('/change-password');
                        }
                        if (response.data.status == true) {
                              req.flash('message', "Change Password " + response.data.message);
                              res.redirect('/');
                        }
                  });
            } catch (error) {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/change-password');
            }
      })

      // Role
      app.get('/roles', isUserAllowed, function (req, res) {
            res.locals = { title: 'Roles' };
            api.Roles.fetchRoles().then((response) => {
                  if (response.data.status == true) {
                        res.render('Roles/Roles', { user: req.session.user, roles: response.data.data.roles, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });
      app.get('/add-role', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Role' };
            res.render('Roles/AddRole', { 'message': req.flash('message'), 'error': req.flash('error') });
      });
      app.post('/add-role', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add Role' };
            api.Roles.addRole(req.body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Role Created " + response.data.message);
                        res.redirect('/roles');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });
      app.get('/edit-role/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit Role' };
            api.Roles.fetchRole(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.render('Roles/EditRole', { role: response.data.data.role, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });
      app.get('/view-role/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'View Role' };
            api.Roles.fetchRole(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });
      app.post('/edit-role/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Edit Role' };
            api.Roles.updateRole(req.body, req.params.id).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Update Role " + response.data.message);
                        res.redirect('/roles');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });
      app.post('/delete-role/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Role' };
            api.Roles.deleteRole(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/roles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/roles');
            });
      });

      // Privileges
      app.get('/privileges', isUserAllowed, function (req, res) {
            res.locals = { title: 'Privileges' };
            api.Privileges.fetchPrivileges().then((response) => {
                  if (response.data.status == true) {
                        res.render('Privileges/Privileges', { user: req.session.user, privileges: response.data.data.privileges, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            });
      });
      app.get('/add-privilege', isUserAllowed, async function (req, res) {
            res.locals = { title: 'Add Privilege' };
            let roles = await api.Roles.fetchRoles();
            let accounts = await api.CompanyService.fetchActiveCompanies();
            res.render('Privileges/AddPrivilege', { roles: roles.data.data.roles, accounts: accounts.data.data.companies, 'message': req.flash('message'), 'error': req.flash('error') });
      });
      app.post('/add-privilege', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add-Privilege' };
            api.Privileges.addPrivilege(req.body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "User Created " + response.data.message);
                        res.redirect('/privileges');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            })
      });
      app.get('/edit-privilege/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit Privilege' };
            api.Privileges.fetchPrivilege(req.params.id).then(async (response) => {
                  if (response.data.status == true) {
                        let roles = await api.Roles.fetchRoles();
                        let accounts = await api.CompanyService.fetchActiveCompanies();
                        console.log('###### # #######', response.data.data.privilege)
                        res.render('Privileges/EditPrivilege', { roles: roles.data.data.roles, accounts: accounts.data.data.companies, privilege: response.data.data.privilege, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            });
      });
      app.get('/view-privilege/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'View Privilege' };
            api.Privileges.fetchPrivilege(req.params.id).then(async (response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            });
      });
      app.post('/edit-privilege/:id', isUserAllowed, urlencodeParser, async function (req, res) {
            res.locals = { title: 'Edit Privilege' };
            let body = req.body;
            let data = {
                  name: body.name,
                  email: body.email,
                  roleId: body.roleId
            }
            if (body.password) {
                  let hash = await bcrypt.hashSync(body.password, 10);
                  data.password = hash
            }
            api.Privileges.updatePrivilege(data, req.params.id).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Update User " + response.data.message);
                        res.redirect('/privileges');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            });
      });
      app.post('/delete-privilege/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Privilege' };
            api.Privileges.deletePrivilege(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/privileges');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/privileges');
            });
      });

      //Category
      app.get('/categories', isUserAllowed, function (req, res) {
            res.locals = { title: 'Categories' };
            api.CategoriesService.fetchCategories().then((response) => {
                  if (response.data.status == true) {
                        res.render('Categories/Categories', { categories: response.data.data.categories, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            });
      });
      app.get('/add-category', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Category' };
            res.render('Categories/AddCategory', { 'message': req.flash('message'), 'error': req.flash('error') });
      });
      app.post('/add-category', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add Category' };
            api.CategoriesService.addCategory(req.body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Category Created " + response.data.message);
                        res.redirect('/categories');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            })
      });
      app.get('/edit-category/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit Category' };
            api.CategoriesService.fetchCategory(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.render('Categories/EditCategory', { category: response.data.data.category, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            });
      });
      app.get('/view-category/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'View Category' };
            api.CategoriesService.fetchCategory(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            });
      });
      app.post('/edit-category/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Edit Category' };
            api.CategoriesService.updateCategory(req.body, req.params.id).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Update Category " + response.data.message);
                        res.redirect('/categories');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            });
      });
      app.post('/delete-category/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Category' };
            api.CategoriesService.deleteCategory(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/categories');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/categories');
            });
      });

      //Rates
      app.get('/rates', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rates' };
            api.RatesService.getAllRates().then((response) => {
                  if (response.data.status == true) {
                        res.render('Rates/Rates', { rates: response.data.data.rates, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/rates');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/rates');
            });
      });

      app.get('/add-rate', isUserAllowed, async function (req, res) {
            res.locals = { title: 'Add Rate' };
            let currencies = await api.CountryService.getAllCurrencies();
            res.render('Rates/AddRate', { currencies: currencies.data.data.currencies, 'message': req.flash('message'), 'error': req.flash('error') });
      });

      app.post('/add-rate', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add Rate' };
            var data = [];
            if (typeof (req.body.totalHours) == 'string' && typeof (req.body.price) == 'string' && typeof(req.body.currency) == 'string'){
                  var obj = {}
                  obj.totalHours = req.body.totalHours
                  obj.price = req.body.price
                  obj.currency = req.body.currency
                  data.push(obj)
            }else{
                  req.body.totalHours.map((h, i) => {
                        var obj = {}
                        obj.totalHours = h
                        obj.price = req.body.price[i]
                        obj.currency = req.body.currency[i]
                        data.push(obj)
                  })
            }

            let body = {
                  parkingData:data,
                  rate: req.body.rate,
                  freeParkingDuration: req.body.freeParkingDuration,
                  days:{ 
                        all : (req.body.all) ? true : false,
                        monday: (req.body.monday) ? true : false,
                        tuesday: (req.body.tuesday) ? true : false,
                        wednesday: (req.body.wednesday) ? true : false,
                        thursday: (req.body.thursday) ? true : false,
                        friday: (req.body.friday) ? true : false,
                        saturday: (req.body.saturday) ? true : false,
                        sunday: (req.body.sunday) ? true : false
                  }
            }

            api.RatesService.createRate(body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Rate Created " + response.data.message);
                        res.redirect('/rates');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/rates');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/rates');
            })
      });
      app.get('/edit-rate/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit Rate' };
            api.RatesService.getRateDetails(req.params.id).then(async (response) => {
                  console.log(response.data.data.rate)
                  if (response.data.status == true) {
                        let currencies = await api.CountryService.getAllCurrencies();
                        res.render('Rates/EditRate', { currencies: currencies.data.data.currencies, rate: response.data.data.rate, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/rates');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/rates');
            });
      });
      app.post('/edit-rate/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Edit Rate' };
            var data = [];
            if (typeof (req.body.totalHours) == 'string' && typeof (req.body.price) == 'string' && typeof (req.body.currency) == 'string') {
                  var obj = {}
                  obj.totalHours = req.body.totalHours
                  obj.price = req.body.price
                  obj.currency = req.body.currency
                  data.push(obj)
            } else {
                  req.body.totalHours.map((h, i) => {
                        var obj = {}
                        obj.totalHours = h
                        obj.price = req.body.price[i]
                        obj.currency = req.body.currency[i]
                        data.push(obj)
                  })
            }

            let body = {
                  parkingData: data,
                  rate: req.body.rate,
                  freeParkingDuration: req.body.freeParkingDuration,
                  days: {
                        all: (req.body.all) ? true : false,
                        monday: (req.body.monday) ? true : false,
                        tuesday: (req.body.tuesday) ? true : false,
                        wednesday: (req.body.wednesday) ? true : false,
                        thursday: (req.body.thursday) ? true : false,
                        friday: (req.body.friday) ? true : false,
                        saturday: (req.body.saturday) ? true : false,
                        sunday: (req.body.sunday) ? true : false
                  }
            }
            api.RatesService.updateRate(body, req.params.id).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Update Rate " + response.data.message);
                        res.redirect('/rates');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/rates');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/rates');
            });
      });
      app.post('/delete-rate/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Rate' };
            api.RatesService.deleteRate(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/rates');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/rates');
            });
      });

      //Accounts
      app.get('/accounts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Accounts' };
            api.CompanyService.fetchCompanies().then((response) => {
                  if (response.data.status == true) {
                        res.render('Accounts/Accounts', { user: req.session.user, companies: response.data.data.companies, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.get('/add-account', isUserAllowed, async function (req, res) {
            res.locals = { title: 'Add Account' };
            let countries = await api.CountryService.getAllCountries();
            let timezones = await api.CountryService.getAllTimezones();
            res.render('Accounts/AddAccount', { countries: countries.data.data.countries, timezones: timezones.data.data.timezones, 'message': req.flash('message'), 'error': req.flash('error') });
      });

      app.post('/add-account', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add Account' };
            api.CompanyService.addCompany(req.body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Account Created " + response.data.message);
                        res.redirect('/accounts');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            })
      });

      app.get('/edit-company/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Edit Company' };
            api.CompanyService.fetchCompany(req.params.id).then(async (response) => {
                  if (response.data.status == true) {
                        let countries = await api.CountryService.getAllCountries();
                        let timezones = await api.CountryService.getAllTimezones();
                        let states = await api.CountryService.getStatesBasedOnCountry(response.data.data.company.countryCode);
                        let cities = await api.CountryService.getCitiesBasedOnCountryState(response.data.data.company.countryCode, response.data.data.company.stateCode);
                        res.render('Accounts/EditAccount', { countries: countries.data.data.countries, timezones: timezones.data.data.timezones, states: states.data.data.states, cities: cities.data.data.cities, user: req.session.user, company: response.data.data.company, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.get('/view-company/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'View Account' };
            api.CompanyService.fetchCompany(req.params.id).then(async (response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.post('/edit-company/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Edit Company' };
            api.CompanyService.updateCompany(req.body, req.params.id).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Update Account " + response.data.message);
                        res.redirect('/accounts');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.post('/delete-company/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Account' };
            api.CompanyService.deleteCompany(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.get('/getStatesBasedOnCountry/:id', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Account' };
            api.CountryService.getStatesBasedOnCountry(req.params.id).then(async (response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      app.get('/getCitiesBasedOnCountryState/:countryId/:stateId', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Account' };
            api.CountryService.getCitiesBasedOnCountryState(req.params.countryId, req.params.stateId).then(async (response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/accounts');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/accounts');
            });
      });

      //Blocked Vehicles
      app.get('/blocked_vehicles', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blocked Vehicles' };
            
            api.BlockedVehicleService.getAllBlockedVehicles().then((response) => {
                  if (response.data.status == true) {
                        res.render('BlockedVehicles/Vehicles', { user: req.session.user, vehicles: response.data.data.vehicles, 'message': req.flash('message'), 'error': req.flash('error') });
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/blocked_vehicles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/blocked_vehicles');
            });
      });

      app.get('/add-vehicle', isUserAllowed, async function (req, res) {
            res.locals = { title: 'Add Vehicle' };
            let accounts = await api.CompanyService.fetchActiveCompanies();
            res.render('BlockedVehicles/AddVehicle', { accounts: accounts.data.data.companies, 'message': req.flash('message'), 'error': req.flash('error') });
      });

      app.post('/delete-vehicle/:id', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Delete Vehicle' };
            api.BlockedVehicleService.deleteBlockedVehicle(req.params.id).then((response) => {
                  if (response.data.status == true) {
                        res.json(response.data);
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/blocked_vehicles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/blocked_vehicles');
            });
      });

      app.post('/add-vehicle', isUserAllowed, urlencodeParser, function (req, res) {
            res.locals = { title: 'Add Vehicle' };
            api.BlockedVehicleService.addBlockedVehicle(req.body).then((response) => {
                  if (response.data.status == true) {
                        req.flash('message', "Blocked vehicle added successfully");
                        res.redirect('/blocked_vehicles');
                  }
                  if (response.data.status == false) {
                        req.flash('error', response.data.message);
                        res.redirect('/blocked_vehicles');
                  }
            }).catch((error) => {
                  req.flash('error', 'Something Went Wrong');
                  res.redirect('/blocked_vehicles');
            })
      });
}