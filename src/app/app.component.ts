import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['es', 'en' , 'fr']);
    translate.setDefaultLang('es');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en|fr/) ? browserLang : 'es');
  }
}
