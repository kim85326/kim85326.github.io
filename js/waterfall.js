/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function () {
  /**
   * 内容JSON
   */
  var demoContent = [
    {
      demo_link: "https://kim85326.github.io/mask-map/",
      img_link: "/image/demo/work26.png",
      code_link: "https://github.com/kim85326/mask-map",
      title: "口罩地圖",
      core_tech: "Vue Ajax",
      description: "串接政府口罩供需 API，一起為防疫盡一份心力",
    },
    {
      demo_link: "https://kim85326.github.io/note/",
      img_link: "/image/demo/work25.png",
      code_link: "https://github.com/kim85326/note",
      title: "筆記軟體",
      core_tech: "JavaScript Flexbox",
      description: "The F2E 2nd - 第九關 - 筆記軟體",
    },
    {
      demo_link: "https://kim85326.github.io/cloud-storage/",
      img_link: "/image/demo/work24.png",
      code_link: "https://github.com/kim85326/cloud-storage",
      title: "雲端硬碟",
      core_tech: "JavaScript Flexbox",
      description: "The F2E 2nd - 第八關 - 雲端硬碟",
    },
    {
      demo_link: "https://kim85326.github.io/chatroom/",
      img_link: "/image/demo/work23.png",
      code_link: "https://github.com/kim85326/chatroom",
      title: "匿名聊天室",
      core_tech: "React Flexbox",
      description: "The F2E 2nd - 第七關 - 匿名聊天室",
    },
    {
      demo_link: "https://kim85326.github.io/hotel-booking/",
      img_link: "/image/demo/work22.png",
      code_link: "https://github.com/kim85326/hotel-booking",
      title: "旅館預約服務",
      core_tech: "Flexbox",
      description: "The F2E 2nd - 第六關 - 旅館預約服務",
    },
    {
      demo_link: "https://kim85326.github.io/prosperous-kaohsiung/",
      img_link: "/image/demo/work21.png",
      code_link: "https://github.com/kim85326/prosperous-kaohsiung",
      title: "高雄發大財",
      core_tech: "JavaScript",
      description: "The F2E 2nd - 第五關 - 90 秒挑戰遊戲",
    },
    {
      demo_link: "https://kim85326.github.io/f2e-2019-payment/",
      img_link: "/image/demo/work20.png",
      code_link: "https://github.com/kim85326/f2e-2019-payment",
      title: "線上支付",
      core_tech: "Flexbox",
      description: "The F2E 2nd - 第四關 - 線上支付",
    },
    {
      demo_link: "https://kim85326.github.io/mp3-player/",
      img_link: "/image/demo/work19.png",
      code_link: "https://github.com/kim85326/mp3-player",
      title: "MP3 Player",
      core_tech: "Flexbox",
      description: "The F2E 2nd - 第三關 - MP3 Player",
    },
    {
      demo_link: "https://kim85326.github.io/freecell/",
      img_link: "/image/demo/work18.png",
      code_link: "https://github.com/kim85326/freecell",
      title: "新接龍",
      core_tech: "JavaScript Flexbox",
      description: "The F2E 2nd - 第二關 - 新接龍",
    },
    {
      demo_link: "https://kim85326.github.io/pomodoro/",
      img_link: "/image/demo/work17.png",
      code_link: "https://github.com/kim85326/pomodoro",
      title: "蕃茄鐘",
      core_tech: "React Sass",
      description: "The F2E 2nd - 第一關 - 蕃茄鐘",
    },
    {
      demo_link: "https://kim85326.github.io/fear/",
      img_link: "/image/demo/work16.png",
      code_link: "https://github.com/kim85326/fear",
      title: "怕怕緊抱",
      core_tech: "React Redux TypeScript Lottie CSS animation transform",
      description: "《怕怕緊抱》是協助大家面對恐懼的故事作品",
    },
    {
      demo_link: "https://www.ruby-vpn.com/",
      img_link: "/image/demo/work15.png",
      title: "Ruby VPN",
      core_tech: "React Redux TypeScript Lottie CSS animation transform",
      description: "Ruby VPN APP 官方網站",
    },
    {
      demo_link: "https://kim85326.github.io/ttha/",
      img_link: "/image/demo/work1.png",
      code_link: "https://github.com/kim85326/ttha",
      title: "Taitung Homestay Accociation",
      core_tech: "jQuery BootStrap RWD",
      description: "台東民宿協會官方網站",
    },
    {
      demo_link: "http://nice3s.com/",
      img_link: "/image/demo/work2.png",
      title: "nice3s",
      core_tech: "jQuery BootStrap RWD",
      description: "格好青旅 welcome page",
    },
    {
      demo_link: "https://kim85326.github.io/sweetaste/",
      img_link: "/image/demo/work13.png",
      title: "甜點電商",
      core_tech: "React Typescript SASS",
      description: "六角學院辦的切版大賽<br>根據提供設計稿來完成切版",
    },
    {
      demo_link: "https://kim85326.github.io/animation_practice_ig/",
      img_link: "/image/demo/work3.png",
      title: "Instagram",
      core_tech: "Sass JavaScript",
      description: "練習 css 的 animation<br>還有一些互動行為",
    },
    {
      demo_link: "https://kim85326.github.io/slot-machine/",
      img_link: "/image/demo/work12.png",
      title: "角子老虎機",
      core_tech: "CSS animation transform react",
      description: "在公司聖誕晚會看到的抽獎工具，自己就想也做一個",
    },
    {
      demo_link: "https://kim85326.github.io/taiwan_free_wifi/",
      img_link: "/image/demo/work14.png",
      title: "Free wifi",
      core_tech: "Google Map API 政府資料開放平臺",
      description: "練習 Google Map API - 根據台灣政府開放資料顯示出台灣免費熱點",
    },
    {
      demo_link: "https://kim85326.github.io/dumpling/",
      img_link: "/image/demo/work4.png",
      title: "Dumpling",
      core_tech: "Sass",
      description: "團購水餃<br>這是我第一次使用 sass<br>且利用 prepos 來進行編譯",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week1/todolist.html",
      img_link: "/image/demo/work5.png",
      title: "THE F2E 前端修煉精神時光屋 第一關",
      core_tech: "Flexbox Bootstrap Vue",
      description:
        "2018年6月參加六角學院舉辦的活動<br>每週舉辦方會出一道題目<br>參賽者需按照提供的設計稿完成關卡<br>第一關題目是 TodoList",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week2/dist/index.html",
      img_link: "/image/demo/work6.png",
      title: "THE F2E 前端修煉精神時光屋 第二關",
      core_tech: "Bootstrap RWD Vue-CLI",
      description: "第二關題目是 Filter",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week3/index.html",
      img_link: "/image/demo/work7.png",
      title: "THE F2E 前端修煉精神時光屋 第三關",
      core_tech: "Flexbox Sass jQuery",
      description: "第三關題目是 Admin Order",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week4/index.html",
      img_link: "/image/demo/work8.png",
      title: "THE F2E 前端修煉精神時光屋 第四關",
      core_tech: "Grid",
      description: "第四關題目是 Product Gallery",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week5/dist/index.html",
      img_link: "/image/demo/work9.png",
      title: "THE F2E 前端修煉精神時光屋 第五關",
      core_tech: "Sass Vue-CLI Axios",
      description: "第五關題目是 Comic Viewer",
    },
    {
      demo_link: "https://kim85326.github.io/f2e/week6/",
      img_link: "/image/demo/work10.png",
      title: "THE F2E 前端修煉精神時光屋 第六關",
      core_tech: "jQuery BootStrap",
      description: "第六關題目是 Validation",
    },
    {
      demo_link: "https://track-spending.herokuapp.com/",
      img_link: "/image/demo/work11.png",
      title: "小記帳",
      core_tech: "Express Nodejs",
      description: "第一次學習 Javascript 時做出的記帳小工具",
    },
  ];

  contentInit(demoContent); //内容初始化
  waitImgsLoad(); //等待图片加载，并执行布局初始化
})();

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = "";
  for (var i = 0; i < content.length; i++) {
    htmlStr +=
      '<div class="grid-item">' +
      '   <a class="a-img" href="' +
      content[i].demo_link +
      '" target="_blank">' +
      '       <img src="' +
      content[i].img_link +
      '">' +
      "   </a>" +
      '   <h3 class="demo-title">' +
      '       <a href="' +
      content[i].demo_link +
      '" target="_blank">' +
      content[i].title +
      "</a>" +
      "   </h3>" +
      "   <p>主要技術：" +
      content[i].core_tech +
      "</p>" +
      "   <p>" +
      content[i].description +
      "   </p>" +
      "</div>";
  }
  var grid = document.querySelector(".grid");
  grid.insertAdjacentHTML("afterbegin", htmlStr);
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll(".grid img");
  var totalImgs = imgs.length;
  var count = 0;
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++;
    } else {
      imgs[i].onload = function () {
        // alert('onload')
        count++;
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid();
        }
      };
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid();
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry(".grid", {
    // options
    itemSelector: ".grid-item",
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20,
  });
}
