// ui notifications
let notificationCount = $('.notification .not-head span');
let notificationUI = $('.notification .not-body ul');
class notifications {
       // notifications  template 
       static not_temp(text, id) {
              let temp = `<div class="not-container">
<li><i class="fas fa-shopping-basket"></i> ${text}</li> <i class="fas fa-window-close close" id="${id}"></i></div>`;
              notificationUI.append(temp);
       }
       //notifications display ui
       static notF() {
              let not = local_storage.get_notifications();
              if (not.length > 0) {
                     not.forEach(el => {
                            this.not_temp(el.text, el.id);
                     });
              } else {
                     let no_notifications = '<li>you have no notifications</li>';
                     notificationUI.append(no_notifications);
              }
              this.addevent();
       }
       // noty count 
       static not_count() {
              let notyNum = 0;
              let not = local_storage.get_notifications();
              not.forEach(() => {
                     notyNum++;
              });
              notificationCount.text(notyNum);
       }
       //event remove notification
       static addevent() {
              // add event clse btn
              let not_elements = document.querySelectorAll('.not-container ');
              not_elements.forEach(el => {
                     $(el).on('click', (e) => {
                            if (e.target.classList.contains("close")) {
                                   // remove notifications 
                                   e.target.parentElement.remove();
                                   local_storage.remove_notifications(e.target.id);
                                   this.not_count();
                            }
                     })
              })
       }


}

notifications.notF();
notifications.not_count();