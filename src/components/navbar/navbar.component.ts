import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {App, NavController, PopoverController, Searchbar} from 'ionic-angular';
import {IStorage, ServiceStorage} from '../../providers/atom/service-storage';

@Component({
  selector: 'navBar',
  templateUrl: 'navbar.component.html'
})

export class Navbar {

  @Input() title = 'Bibooki';
  @Input() hasPopBible = false;
  @Input() hasPopHistory = false;
  @Input() hasRightMenu = false;
  @Input() hasSearch = false;
  @Input() hasSearchTitle = false;  // apply for chapter title & search in chapter
  @Input() hasReturn = true;
  @Input() searchText = '';

  @Output() onSearch = new EventEmitter<string>();
  @Output() onToggleRightMenu = new EventEmitter<void>();
  @Output() onChangeBookChapter = new EventEmitter<void>();

  @ViewChild(Searchbar) searchbar: Searchbar;

  isSearchActive = false;
  bSetting: IStorage;

  constructor(private navCtrl: NavController,
              private app: App,
              private popoverCtrl: PopoverController,
              private serviceStorage: ServiceStorage) {

    this.bSetting = this.serviceStorage.bibleSetting;

  }

  onclick_popoverHistory(myEvent) {
    const popover = this.popoverCtrl.create('popover-history');
    popover.present({ ev: myEvent });

    popover.onDidDismiss(isHistorySelected => {
      if (isHistorySelected) {
        const currentPage = this.navCtrl.getActive().name;
        if (currentPage === 'ChapterDetailPage')
          this.onChangeBookChapter.emit();
        else
          this.navCtrl.push('chapter-detail');
      }
    });
  }

  onclick_searchInTitle() {
    if (this.hasSearchTitle) {
      this.hasSearch = true;
      this.isSearchActive = true;
      setTimeout(() => this.searchbar.setFocus());
    }
  }

  onSearchInput(ev) {
    const val = ev.target.value;
    this.searchText = val && val.trim() != '' ? val : '';
    this.onSearch.emit(this.searchText);
  }

  onSearchClear() {
    this.searchText = '';
    this.onSearch.emit(this.searchText);
  }

  onSearchFocus() {
    this.isSearchActive = true;
  }

  onSearchBlur() {
    if (this.hasSearchTitle) {
      this.hasSearch = false;
    }
    this.isSearchActive = false;
  }

  toggleRightMenu() {
    this.onToggleRightMenu.emit()
  }

  returnHome() {
    if (this.navCtrl.length() > 1)
      this.navCtrl.popToRoot();
    else
      this.app.getRootNav().setRoot('home');
  }
}
