import { createPopper } from '@popperjs/core';
import '../scss/style.scss'
import Sortable from 'sortablejs';

function getDaysInMonth(months) {
    const currentDate = new Date();
    const actualDay = currentDate.getUTCDate();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = currentDate.getFullYear();
    const actualDate = dd + '.' + mm + '.' + yyyy;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const daysOfWeek = [6,0,1,2,3,4,5];
    
    return {currentDate, year, month: months[month], daysInMonth, firstDay: daysOfWeek[firstDayOfMonth], actualDay, actualDate};
  }


function mainPageRender(dayWork){

  const goalsMenuRender = document.createElement('section');
  goalsMenuRender.className = 'work';
  const dateArr = dayWork.split('.');
  goalsMenuRender.innerHTML = `
          <div class="work__title">
            <div class="work__head">Задачи</div>
            <div class="work__date">${dayWork}, ${daysList[(new Date(dateArr[2], dateArr[1], dateArr[0]-2).getDay())]} </div>
          </div>
          <div class="work__body">
            <div id="checklist">
            </div>
          </div
          <div class = 'work__footer'>
            <button class="addTask">
              <img src="/public/images/addTask_img.svg" alt="Add Task icon">
              Добавить задачу
            </button>
          </div>
          `;
          let tasksforDate;
          if(Object.keys(taskRepsy).indexOf(dayWork) != -1){
            tasksforDate =  taskRepsy[dayWork];
          } else{
            taskRepsy[dayWork] = new Object();
            tasksforDate = taskRepsy[dayWork];
          }
          const tasksBd = new Array();
          if(Object.keys(tasksforDate).length > 0){
            
            for(let key of Object.keys(tasksforDate)){
              let inputCont = document.createElement('div');
              inputCont.className = 'checkbox__item';
              inputCont.classList.add(`checkbox__item${key}`);
              inputCont.setAttribute('data-index', key);
              let workTask = document.createElement('input');
              if(+tasksforDate[key][2].slice(' ')[1]== 1){
                workTask.classList.add('checklistBox_P1')
              }
              else if(+tasksforDate[key][2].slice(' ')[1]== 2){
                workTask.classList.add('checklistBox_P2')
              }
              else if(+tasksforDate[key][2].slice(' ')[1]== 3){
                workTask.classList.add('checklistBox_P3')
              }
              else{
                workTask.classList.add('checklistBox_P4')
              }

              workTask.type = 'checkbox';
              workTask.id = key;
              workTask.name = 'r'
              workTask.value = key;
              let workTaskTitle = document.createElement('label');
              if(+tasksforDate[key][2].slice(' ')[1]== 1){
                workTaskTitle.classList.add('checklist_P1')
              }
              else if(+tasksforDate[key][2].slice(' ')[1]== 2){
                workTaskTitle.classList.add('checklist_P2')
              }
              else if(+tasksforDate[key][2].slice(' ')[1]== 3){
                workTaskTitle.classList.add('checklist_P3')
              }
              else{
                workTaskTitle.classList.add('checklist_P4')
              }
              workTaskTitle.for = key;
              workTaskTitle.id = `${key}label`;
  
              if(tasksforDate[key][3] != ''){
                workTaskTitle.innerHTML = `${tasksforDate[key][0], tasksforDate[key][3]}`;
              } else{
                workTaskTitle.innerHTML = `${tasksforDate[key][0]}`;
              }
              inputCont.innerHTML = '';
              inputCont.append(workTask);
              inputCont.append(workTaskTitle);
              tasksBd.push(inputCont);
            }
          }
          const retAr = [goalsMenuRender, tasksBd]
          return retAr;

}



function GoalsMenuMain(event, dayWork){
  mainPart.innerHTML = '';
  const [goalsMenu, tasksBd] = mainPageRender(dayWork);
  mainPart.append(goalsMenu);
  const addTasker = document.querySelector('.addTask');
  const checklist = document.querySelector('#checklist');
  if(tasksBd.length > 0){
    for(let task of tasksBd){
      checklist.append(task);
    }
  }

  checklist.addEventListener('click', function(event){
    if(event.target.type == 'checkbox'){
      const checkedId = event.target.id;
      goalsMenu.append(sucsNotif);
      sucsNotif.classList.add('active');
      const notificationTimeout = setTimeout(() => {
        sucsNotif.classList.remove('active');
        const box = document.querySelector(`.checkbox__item${checkedId}`)
        const input = document.getElementById(checkedId);
        const label = document.getElementById(`${checkedId}label`);
        const deldate = document.querySelector('.work__date').innerHTML.split(',');
        delete taskRepsy[deldate[0]][checkedId];
        box.remove();
        input.remove();
        label.remove();
        sucsNotif.remove();
      }, 5000);

      // Обработчик клика по кнопке подтверждения
      document.querySelector('.notification__btn').addEventListener('click', () => {
        sucsNotif.classList.remove('active');
          clearTimeout(notificationTimeout); // Очищаем таймер
          event.target.checked = false; // Снимаем чек
          sucsNotif.remove();
      });

      }
      else{
        const targ = event.target.closest('label')
        let num = targ.id;
        num = num.split('')[0];
        const daysTask =taskRepsy[dayWork];
        const labelhead = daysTask[+num][0];
        const desc = daysTask[+num][1];
        const prior = daysTask[+num][2];
        const time = daysTask[+num][3];
        console.log(time);
        let timeBlok = document.createElement('div');
        const info = document.createElement('div');
        info.classList.add('overlayInfo');
        if(time != ''){
          timeBlok.classList.add('checklistInfo__time');
          timeBlok.innerHTML = `${time}`;
          info.innerHTML = `
        <div class="checklistInfo">
        <div class="checklistInfo_cont">
          <div class="checklistInfo__head">
            ${dayWork}
            <button class = 'checklistInfo__closeBtn'>
              <img src="/public/images/addTask_img.svg" alt="Close">
            </button>
          </div>
        </div>
        <div class="checklistInfo__line"></div>
        <div class="checklistInfo_cont">
          <div class="checklistInfo__title">
            <div class = 'checklistInfo__title1' >${labelhead}</div><div class = 'checklistInfo__title2' > ${prior}</div>
          </div>
          <div class = 'checklistInfo__time'>
          ${time}
          </div>
          <textarea class = 'checklistInfo__body' placeholder="Описание">${desc}</textarea>
          <div class="checklistInfoPlus">
            <button class="checklistInfoPlus__head">
              <img src="/public/images/addTask_img.svg" alt="Add">
              Добавить подзадачу
            </button>
            <div class="checklistInfoPlus__body">

            </div>
          </div>
        </div>
      </div>
        `;

        } else{
          info.innerHTML = `
        <div class="checklistInfo">
        <div class="checklistInfo_cont">
          <div class="checklistInfo__head">
            ${dayWork}
            <button class = 'checklistInfo__closeBtn'>
              <img src="/public/images/addTask_img.svg" alt="Close">
            </button>
          </div>
        </div>
        <div class="checklistInfo__line"></div>
        <div class="checklistInfo_cont">
          <div class="checklistInfo__title">
            <div class = 'checklistInfo__title1' >${labelhead}</div><div class = 'checklistInfo__title2' > ${prior}</div>
          </div>
          <textarea class = 'checklistInfo__body' placeholder="Описание">${desc}</textarea>
          <div class="checklistInfoPlus">
            <button class="checklistInfoPlus__head">
              <img src="/public/images/addTask_img.svg" alt="Add">
              Добавить подзадачу
            </button>
            <div class="checklistInfoPlus__body">

            </div>
          </div>
        </div>
      </div>
        `;
        }
        mainPart.append(info);
        document.querySelector('.checklistInfo__closeBtn').addEventListener('click', function(){
          taskRepsy[dayWork][+num][1] = document.querySelector('.checklistInfo__body').value;
          info.remove();
        })

      }
    
  })

  checklist.addEventListener('mousedown', function(event){
      const sortable = new Sortable(checklist, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        handle: '.checkbox__item',
        onEnd: function (evt) {
            let itemEl = evt.item; // Див, который перемещается
            let currentIndex = parseInt(itemEl.getAttribute('data-index'));
            let newIndex = evt.newIndex + 1; // Новый индекс

            // Обновление индексов всех элементов
            let actualDate = document.querySelector('.work__date').textContent.split(',')[0];
            let tasksforDate =  taskRepsy[actualDate];
            let items = Array.from(checklist.children);
            let newnum = new Array();
            items.forEach((item, index) => {
              newnum.push(item.getAttribute('data-index'));
                
            });
            let promObj = new Object();
            let i = 0;

            for(let key in Object.keys(tasksforDate)){
              if(key != newnum[i]){
                let nowpozkey = newnum.indexOf(key);
                [tasksforDate[+key+1], tasksforDate[newnum[i]]] = [tasksforDate[newnum[i]], tasksforDate[+key+1]];
                [newnum[i], newnum[nowpozkey]] = [newnum[nowpozkey], newnum[i]];
              }
              i+=1;
            }
            taskRepsy[actualDate] = tasksforDate;
            usersData[actualusername] = taskRepsy;
        }
    });
    }
  );


  addTasker.addEventListener('click', function(event){
      modalAdd.classList.toggle('overlay_hidden');
      addTaskModal.addEventListener('click', function(){
          const title = document.getElementById('taskForm_title').value;
          const prior = priorBtn.textContent == 'Приоритет' ? priorList.lastElementChild.innerHTML : priorBtn.innerHTML;
          const time = document.querySelector('.timeChoose__input').value;
          const actualdatafordata = document.querySelector('.work__date').textContent.split(',')[0];
          if((title.length) != 0){
            const dayGoals = Object.keys(taskRepsy[dayWork]);
            if(Math.max(...dayGoals)+1 == Infinity ||Math.max(...dayGoals)+1 == -Infinity){
              taskNum = 1;
            } else {
              taskNum = Math.max(...dayGoals)+1;
            }
            
            

            const description = document.getElementById('taskForm_description').value;
            taskRepsy[actualdatafordata][taskNum] = [title, description, prior, time];
            usersData[username] = taskRepsy;
            let inputCont = document.createElement('div');
            inputCont.className = 'checkbox__item';
            inputCont.classList.add(`checkbox__item${taskNum}`);
            inputCont.setAttribute('data-index', taskNum);
            let workTask = document.createElement('input');
            if(+prior.slice(' ')[1]== 1){
              workTask.classList.add('checklistBox_P1')
            }
            else if(+prior.slice(' ')[1]== 2){
              workTask.classList.add('checklistBox_P2')
            }
            else if(+prior.slice(' ')[1]== 3){
              workTask.classList.add('checklistBox_P3')
            }
            else{
              workTask.classList.add('checklistBox_P4')
            }
            workTask.type = 'checkbox';
            workTask.id = taskNum;
            workTask.name = 'r'
            workTask.value = taskNum;
            let workTaskTitle = document.createElement('label');
            if(+prior.slice(' ')[1]== 1){
              workTaskTitle.classList.add('checklist_P1')
            }
            else if(+prior.slice(' ')[1]== 2){
              workTaskTitle.classList.add('checklist_P2')
            }
            else if(+prior.slice(' ')[1]== 3){
              workTaskTitle.classList.add('checklist_P3')
            }
            else{
              workTaskTitle.classList.add('checklist_P4')
            }
            workTaskTitle.for = taskNum;
            workTaskTitle.id = `${taskNum}label`;
            taskNum+=1;
            if(time != ''){
              workTaskTitle.innerHTML = `${title}, ${time}`;
            } else{
              workTaskTitle.innerHTML = `${title}`;
            }
            const checklist = document.querySelector('#checklist');
            inputCont.append(workTask);
            inputCont.append(workTaskTitle);
            checklist.append(inputCont);
            modalAdd.classList.toggle('overlay_hidden');
            document.getElementById('taskForm_title').value = '';
            document.getElementById('taskForm_description').value ='';
            document.querySelector('.timeChoose__input').value = '';
            priorBtn.innerHTML = `Приоритет`
          }
          

      })

  })
}

const account = document.querySelector('.account');
const accountEnter = document.querySelector('.account__enter');
const accountReg = document.querySelector('.account__reg');
const sideBtn = document.querySelector('.main__sideBTN');
const goals = document.querySelector('.main__goals');
const calendar = document.querySelector('.calendar');
const calendarTitle = document.querySelector('.calendar__title');
const calendarInner = document.querySelector('.calendar__inner');
const calendarModal = document.querySelector('.calendarModal');
const calendarModalTitle = document.querySelector('.calendarModal__title');
const calendarModalInner = document.querySelector('.calendarModal__inner');
const mainPart = document.querySelector('.main__workPart');
const modalAdd = document.querySelector('.overlay');
const mainAdder = document.querySelector('.main__navigBtn_add');
const cancelBtn = document.querySelector('#cancelBtn');
const addTaskModal = document.querySelector('#addTaskBtn');
const mainpartadder = document.querySelector('.overlay_1');
const maintaskcnl = document.querySelector('#cancelBtnMain');
const priorBtnMain = document.querySelector('.taskFormMain__prior');
const priorListMain = document.querySelector('.taskFormMain__priorUl');
const priorBtn = document.querySelector('.taskForm__prior');
const priorList = document.querySelector('.taskForm__priorUl');
const dateBtn = document.querySelector('.taskForm__date');
const dateModal = document.querySelector('.taskForm__dateModal');
const maintaskadd = document.querySelector('#addTaskBtnMain');
const mainPage = document.querySelector('.main');



const loginform = document.getElementById('enter__loginForm');

let usersAccount = {
  '1': '1',
  '2': '2',
};

let usersData = new Object();
let taskRepsy;
let actualusername

account.addEventListener('click', function(event){
  document.querySelector('.accountPage').classList.toggle('accountPage_hide');
  document.querySelector('.accountPage').classList.toggle('accountPage_flex');
})

accountEnter.addEventListener('click', function(event){
  if(accountEnter.textContent == 'Войти'){
    document.querySelector('.accountPage').classList.toggle('accountPage_flex');
    document.querySelector('.accountPage').classList.toggle('accountPage_hide');
    document.querySelector('.enter').classList.toggle('enter_hide');
    mainPart.innerHTML = '';
    if (calendar.classList[1] != 'calendar_hide') {
      calendar.classList.add('calendar_hide');
  }
  } else {

    usersData[actualusername] = taskRepsy;

    accountEnter.innerHTML = 'Войти';
    taskRepsy = new Object();
    document.querySelector('.account__name').innerHTML = 'Вход';
    mainPart.innerHTML = '';
    if (calendar.classList[1] != 'calendar_hide') {
      calendar.classList.add('calendar_hide');
  }
  accountReg.style.display = 'block'
}
})


accountReg.addEventListener('click', function(event){
  mainPart.innerHTML = '';
    if (calendar.classList[1] != 'calendar_hide') {
      calendar.classList.add('calendar_hide');
  }
  document.querySelector('.reg').classList.toggle('reg_hide');
})

reg__loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  actualusername = document.getElementById('usernameReg').value;
  const password = document.getElementById('passwordReg').value;
  const message = document.getElementById('reg_message');

  if (Object.keys(usersAccount).indexOf(actualusername) == -1) {
      message.style.color = 'green';
      message.textContent = 'Регистрация выполнена успешно';
      usersAccount[actualusername] = password;
      setTimeout(() =>{
        document.querySelector('.account__name').innerHTML = actualusername;
        document.querySelector('.reg').classList.toggle('reg_hide');
        document.getElementById('usernameReg').value = '';
        document.getElementById('passwordReg').value = '';
        document.querySelector('.accountPage').classList.toggle('accountPage_flex');
        document.querySelector('.accountPage').classList.toggle('accountPage_hide');
        accountEnter.innerHTML = 'Выйти';
        message.style.display = 'none';
        accountReg.style.display = 'none'
      }, 2000);
      usersData[actualusername] = new Object();
      taskRepsy = new Object();

  } else {
      message.style.color = 'red';
      message.textContent = 'Такой пользователь уже есть';
  }
  
  message.style.display = 'block';
});




loginform.addEventListener('submit', function(event) {
  event.preventDefault();

  actualusername = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  if (usersAccount[actualusername] && usersAccount[actualusername] === password) {
      message.style.color = 'green';
      message.textContent = 'Вход выполнен успешно';
      setTimeout(() =>{
        document.querySelector('.account__name').innerHTML = actualusername;
        document.querySelector('.enter').classList.toggle('enter_hide');
        document.querySelector('.accountPage').classList.toggle('accountPage_flex');
        document.querySelector('.accountPage').classList.toggle('accountPage_hide');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        accountEnter.innerHTML = 'Выйти';
        message.style.display = 'none';
        accountReg.style.display = 'none'
      }, 500);
      if(Object.keys(usersData).indexOf(actualusername) == -1){
        usersData[actualusername] = new Object();
        taskRepsy = new Object();
      } else{
        taskRepsy = usersData[actualusername];
      }

  } else {
      message.style.color = 'red';
      message.textContent = 'Неправильный логин или пароль';
  }
  
  message.style.display = 'block';
});


let sideBtn_flag = 0;
let calendar_flag = 0;
sideBtn.addEventListener('click', function(event){
  if(sideBtn_flag == 0){
      mainPart.classList.remove('main__workPart_2');
      document.querySelector('.main__sidenav').classList.add('main__sidenav__bk_2');
      mainPart.classList.add('main__workPart_1');
      if(Array.from(calendar.classList).indexOf('calendar_hide') == -1){calendar.classList.add('calendar_hide'); calendar_flag = 1;}
      sideBtn_flag = 1;
  }
  else{
    document.querySelector('.main__sidenav').classList.remove('main__sidenav__bk_2');
    document.querySelector('.main__sidenav').classList.add('main__sidenav__bk_1');
    mainPart.classList.remove('main__workPart_1');
    mainPart.classList.add('main__workPart_2');
    if(calendar_flag){
      calendar.classList.remove('calendar_hide');
       calendar_flag = 0;
    }
    sideBtn_flag = 0;
  }
})  

let chooseDate;
const daysList = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const result = getDaysInMonth(months);      
let taskNum;


  const sucsNotif = document.createElement('div');
  sucsNotif.innerHTML = `<div class="notification" style="--value:5s">
      <div class="notification__timer"></div>
      <div class="notification__wrapper">
        <div class="notification__body">
        <button class = 'notification__btn'>
          Отменить?
        </button
        </div>
      </div>
    </div>`;
  


let dayWork;
let chooseday;

calendarTitle.innerHTML = `${result.month} ${result.year}`;
let i = 0;
while(i < result.firstDay){
    let empty = document.createElement('span');
    empty.classList.add('calendar__item');
    empty.innerHTML = '';
    calendarInner.append(empty);
    i+=1;
}
i = 1;
while(i <= result.daysInMonth){
    let day = document.createElement('span');
    day.classList.add('calendar__item');
    day.classList.add('calendar__item_num');
    if(i == result.actualDay){
        day.classList.add('calendar__item_todayActive');
    }
    day.innerHTML = `${i}`;
    calendarInner.append(day);
    i+=1;
}



mainAdder.addEventListener('click', function(event){
  if(mainpartadder.classList[1] == 'overlay_hidden'){
    dateBtn.innerHTML = `${result.actualDate}`
    dateBtn.classList.add('taskForm__date_today');
    mainpartadder.classList.remove('overlay_hidden');
    maintaskcnl.addEventListener('click', function(){
      mainpartadder.classList.add('overlay_hidden');
      document.querySelector('.taskFormMain_title').value = '';
      document.querySelector('.taskFormMain_title').value = '';
      priorBtn.innerHTML = `Приоритет`
    })
  }
})

dateBtn.addEventListener('click', function(event){
  calendarModalTitle.innerHTML = `${result.month} ${result.year}`;
  let i = 0;
  while(i < result.firstDay){
      let empty = document.createElement('span');
      empty.classList.add('calendar__item');
      empty.innerHTML = '';
      calendarModalInner.append(empty);
      i+=1;
  }
  i = 1;
  while(i <= result.daysInMonth){
      let day = document.createElement('span');
      day.classList.add('calendar__item');
      day.classList.add('calendar__item_num');
      if(i == dateBtn.textContent.split('.')[0]){
          day.classList.add('calendar__item_todayActive');
      }
      day.innerHTML = `${i}`;
      calendarModalInner.append(day);
      i+=1;
  }
  dateModal.classList.remove('taskForm__dateModal_hidden');
  calendarModal.addEventListener('click', function(event){
    chooseday = event.target.closest('span');
    let day = event.target.textContent;
    const monthNum = months.indexOf(calendarTitle.textContent.split(' ')[0]) + 1;
    const year = calendarTitle.textContent.split(' ')[1];
    if( +day < 10){
      day = '0' + day;
    }
    if(monthNum < 10){
      dayWork = day + '.0' + monthNum + '.' + year;
    } else{
      dayWork = day + '.' + monthNum + '.' + year;
    };
    dateBtn.innerHTML= `${dayWork}`;
    dateBtn.classList.toggle('taskForm__date_today');
    dateBtn.classList.toggle('taskForm__date_nottoday');
    dateModal.classList.add('taskForm__dateModal_hidden');
    calendarModalInner.innerHTML = '';
    calendarModalTitle.innerHTML = '';
    priorBtnMain.innerHTML = 'Приоритет';

  })
})

priorBtnMain.addEventListener('click', function(event){
  priorListMain.classList.remove('taskForm__priorUl_hidden');
  priorListMain.addEventListener('click', function(event){
    if(event.target.tagName == 'LI'){
      let priorType = event.target.innerHTML;
      priorListMain.classList.add('taskForm__priorUl_hidden');
      priorBtnMain.innerHTML = priorType;
    }
  })
})

priorBtn.addEventListener('click', function(event){
  priorList.classList.remove('taskForm__priorUl_hidden');
  priorList.addEventListener('click', function(event){
    if(event.target.tagName == 'LI'){
      let priorType = event.target.innerHTML;
      priorList.classList.add('taskForm__priorUl_hidden');
      priorBtn.innerHTML = priorType;
    }
  })
})

maintaskadd.addEventListener('click', function(){
  let maintaskDate = dateBtn.textContent;
  const title = document.querySelector('.taskFormMain_title').value;
  if(title.length > 0){
    const description = document.querySelector('.taskFormMain_desc').value;
    const prior = priorBtnMain.textContent == 'Приоритет' ? priorBtnMain.lastElementChild.innerHTML : priorBtnMain.innerHTML;
    let taskNum;
    try{
      try{
        const dayGoals = Object.keys(taskRepsy[maintaskDate]);
        if(Math.max(...dayGoals)+1 == Infinity ||Math.max(...dayGoals)+1 == -Infinity){
          taskNum = 1;
        } else {
          taskNum = Math.max(...dayGoals)+1;
        }
      } catch(e){
        taskNum = 1;
      }
      taskRepsy[maintaskDate][taskNum] = [title, description, prior];
    } catch(e){
      const newObj = {
        1: [title, description, prior],
      };
      taskRepsy[maintaskDate] = newObj;

    }
    taskNum+=1;
    mainpartadder.classList.add('overlay_hidden');
    document.querySelector('.taskFormMain_title').value = '';
    document.querySelector('.taskFormMain_desc').value = '';
    priorBtnMain.innerHTML = 'Приоритет';
    usersData[actualusername] = taskRepsy;
    

  }

})



goals.addEventListener('click', function(event){
  if(accountEnter.textContent != 'Войти'){
      if (calendar.classList[1] == 'calendar_hide') {
          calendar.classList.remove('calendar_hide');
          calendar.style.transition = 'height 1s';
          calendar.style.height = 'auto';
          dayWork = result.actualDate;
          if(Object.keys(taskRepsy).indexOf(dayWork) == -1){taskRepsy[dayWork] = new Object();}
          GoalsMenuMain(event, dayWork);
      } else{
        calendar.classList.add('calendar_hide');
        mainPart.innerHTML = '';
      }
    }
})


calendar.onmouseover = calendar.onmouseout = handler;
function handler(event) {
    if (event.type == 'mouseover' && event.target.tagName == 'SPAN' && event.target.classList[1] == 'calendar__item_num') {
      event.target.classList.add('calendar__item_active')
      
    }
    if (event.type == 'mouseout') {
        event.target.classList.remove('calendar__item_active')
    }
}


calendar.addEventListener('click', function(event){
  if([...event.target.classList].indexOf('calendar__item_num') != -1){
    try{
        chooseday.classList.remove('calendar__item_todayChoose');
      } 
    catch{};
    event.target.closest('span').classList.add('calendar__item_todayChoose');
    chooseday = event.target.closest('span');
    let day = event.target.textContent;
    const monthNum = months.indexOf(calendarTitle.textContent.split(' ')[0]) + 1;
    const year = calendarTitle.textContent.split(' ')[1];
    if( +day < 10){
      day = '0' + day;
    }
    if(monthNum < 10){
      dayWork = day + '.0' + monthNum + '.' + year;
    } else{
      dayWork = day + '.' + monthNum + '.' + year;
    };
    GoalsMenuMain(event, dayWork);

  }
})

cancelBtn.addEventListener('click', function(){
    modalAdd.classList.toggle('overlay_hidden');
    document.getElementById('taskForm_title').value = '';
    document.getElementById('taskForm_description').value ='';
    priorBtn.innerHTML = `Приоритет`
})





const notionBtn = document.querySelector('.notions__add');

notionBtn.addEventListener('clicl', function(event){
  
})