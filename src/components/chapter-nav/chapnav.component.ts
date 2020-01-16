import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IBible} from '../../types/bible';
import {ServiceBible} from '../../providers/service-bible';
import {IStorage, ServiceStorage} from '../../providers/atom/service-storage';

@Component({
  selector: 'chapnav',
  templateUrl: 'chapnav.component.html'
})

export class ChapNav {

  @Input() chapterNumber: number;
  @Input() chaptersCount: number;
  @Input() hasHighlights = false;

  @Output() onChangeBookChapter = new EventEmitter<void>();

  theBible: IBible;
  bSetting: IStorage;

  constructor(private serviceBible: ServiceBible,
              private serviceStorage: ServiceStorage) {

    this.bSetting = this.serviceStorage.bibleSetting;
    this.theBible = this.serviceBible.theBible;
  }

  onclick_prevChapter() {
    if (this.chapterNumber > 1) {
      this.theBible.resetSelectedChapter(this.chapterNumber - 1);
      this.onChangeBookChapter.emit();
    }
    else {
      const oIndex = this.theBible.getOldIndex(this.theBible.selectedBook);
      const nIndex = this.theBible.getNewIndex(this.theBible.selectedBook);
      const index = this.theBible.getOrderIndex(this.theBible.selectedBook);
      if (index > 0) {
        if (oIndex > 0)
          this.theBible.selectedBook = this.theBible.old[oIndex - 1].number;
        else if (nIndex > 0)
          this.theBible.selectedBook = this.theBible.new[nIndex - 1].number;
        else if (nIndex == 0) {
          this.theBible.selectedBook = this.theBible.old[this.theBible.old.length - 1].number;
        }
        this.theBible.resetSelectedChapter(this.theBible.bookIndex[this.theBible.selectedBook].chapters.length);
        this.onChangeBookChapter.emit();
      }
    }
  }
  onclick_nextChapter() {
    if (this.chapterNumber < this.chaptersCount) {
      this.theBible.resetSelectedChapter(this.chapterNumber + 1);
      this.onChangeBookChapter.emit();
    }
    else {
      const oIndex = this.theBible.getOldIndex(this.theBible.selectedBook);
      const nIndex = this.theBible.getNewIndex(this.theBible.selectedBook);
      const index = this.theBible.getOrderIndex(this.theBible.selectedBook);
      const oLength = this.theBible.old.length;
      const nLength = this.theBible.new.length;
      if (index < (oLength + nLength - 1)) {
        if (oIndex > -1 && oIndex < oLength - 1)
          this.theBible.selectedBook = this.theBible.old[oIndex + 1].number;
        else if (oIndex == oLength - 1)
          this.theBible.selectedBook = this.theBible.new[0].number;
        else if (nIndex > -1 && nIndex < nLength - 1)
          this.theBible.selectedBook = this.theBible.new[nIndex + 1].number;
        this.theBible.resetSelectedChapter(1);
        this.onChangeBookChapter.emit();
      }
    }
  }

}
