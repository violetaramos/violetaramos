const header = document.getElementsByTagName('header')[0];
var fixed = header.offsetTop;
const btn_menu = document.getElementById('btn_menu');
const totop = document.querySelector('.totop_button');
const menu_box = document.getElementById('menu');
const btn_lang = document.querySelector('.btn__lang');

var project_modal = document.getElementById('project-detail');
var myModal = new bootstrap.Modal(project_modal, { keyboard: true });

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', readyLoaded);
} else {
    readyLoaded;
}

// window.onresize = dinamicWith;
window.onscroll = dinamicScroll;
totop.onclick = function() { window.scroll({top: 0, left: 0, behavior: 'smooth' }); };

btn_menu.onclick = function(e) {
  e.preventDefault();
  this.classList.toggle("open");
  menu_box.classList.toggle("open");
};
/* ---- VUE ----*/
var config = new Vue({
  el: '#config',
  data: data.config
});
var menuitems = data.menu;
var menu = new Vue({
    el: '#menu__list',
    data: menuitems
});

var banner = new Vue({
  el: '#banner_text',
  data: data.banner
})
var about = new Vue({
  el: '#about',
  data: data.about
})
var myprojects = new Vue({
  el: '#projects',
  data: data.myprojects
})
/* ---- END VUE ----*/
function readyLoaded() {
    setTimeout(() => {
        AOS.init({
		  duration: 800
		});
        initTooltip
    }, 700);
    dinamicScroll
    // dinamicWith;
}
// function dinamicWith() {
// 	AOS.refresh();
//     if (window.innerWidth > 992) {
        
//     } else {
       
//     }
// }
function dinamicScroll() {
	AOS.refresh();
	(window.pageYOffset > fixed)? header.classList.add("scroll") : header.classList.remove("scroll");
	(window.pageYOffset > 300)? totop.classList.add("active") : totop.classList.remove("active");
}
function showProject (id_project){
	var project = allprojects[id_project];
	document.getElementById('ttl_modal_project').innerHTML = project.name;

	carrusel = document.getElementById('prjt_images');	
	indicators = document.getElementById('prjt_indicators');	
	var images = project.images;
	var slide = "";
	var indicator = "";
	images.forEach( function(img, index) {
		(index==0)? slide_active="active" :  slide_active="";
		(index==0)? indicator_active='class="active" aria-current="true"' :  indicator_active='';
		slide += '<div class="carousel-item '+slide_active+'"><img src="'+img.url+'" class="images_carrusel" alt="'+img.name+'"></div>';
		indicator +='<button type="button" style="background-image: url('+img.url+')" data-bs-target="#proyect" data-bs-slide-to="'+index+'" '+indicator_active+' aria-label="Slide '+(index+1)+'"></button>';
	});
	carrusel.innerHTML = slide;
	indicators.innerHTML = indicator;

	dsc_box = document.getElementById('prjt__description');
	var btn = '';
	if(project.url){
		btn = '<a href="'+project.url+'" class="btn_project" target="_blank">'+allprojects.button[lang]+'</a>'
	}
	dsc_box.innerHTML = '<p>'+project.description[lang]+'</p>'+btn;
	myModal.show(project_modal);
}
function changeLang(){
  if(lang == "en"){
  	createCookie('vr_lang', 'es');
  }else{
  	deleteCookie('vr_lang', 'es')
  }
  setTimeout(() => {
  	location.reload();
  }, 50);
}
function initTooltip(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}
/* ---- COOKIES ----*/
const DOMAIN = location.host;
const CDAYS = 3;
var date = new Date();
var TIMECK = "";
if (CDAYS) {
    date.setTime(date.getTime() + (CDAYS * 24 * 60 * 60 * 1000));
    TIMECK = "; expires=" + date.toUTCString();
}
function createCookie(ck_name, ck_value) {
    document.cookie = ck_name + '=' + ck_value + '' + TIMECK + "; path=/; domain = " + DOMAIN;
}
function deleteCookie(ck_name, ck_value) {
    TIMECK = "; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = ck_name + '=' + ck_value + '' + TIMECK + "; path=/; domain = " + DOMAIN;
}
/* ---- END COOKIES ----*/