interface IBookmarkHistory {
  book: number;
  chapter: number;
  timestamp?: number;
  bookName?: string;
  isBookmarked?: boolean;
}

interface IHighlight extends IBookmarkHistory {
  verse: number;
}

interface IVerse {
  verse: number;
  text: string;
  story?: string;
  textSecond?: string;
  storySecond?: string;
  highlightText?: string;
  highlightTextSecond?: string;
  isHighlighted?: boolean;
}
interface IChapter {
  number: number;
  verses: IVerse[];
  isBookmarked?: boolean;
  hasHighlight?: boolean;
}

interface IBook {
  number: number;
  name: string;
  chapters: IChapter[];
  nameSecond?: string;  // secondary name of the book
  hasBookmark?: boolean;
  hasHighlight?: boolean;
}
interface IBible {
  old: IBook[];
  new: IBook[];
  bookIndex: {
    [bookNumber: number]: IBook
  };
  selectedBook?: number;
  selectedChapter?: IChapter;

  isBookOld(book: number): boolean;
  isBookNew(book: number): boolean;
  getOrderIndex(book: number): number;
  getOldIndex(book: number): number;
  getNewIndex(book: number): number;
  getChapters(book: number): IChapter[];
  reset(): void;

  resetSelectedChapter(chapter: number): void;
}


class Bible implements IBible {

  static OLD_TESTAMENT = 'old';
  static NEW_TESTAMENT = 'new';

  old: IBook[];
  new: IBook[];
  bookIndex: {};
  selectedBook?: number;
  selectedChapter?: IChapter;

  constructor() {
    this.reset();
  }

  isBookOld(book: number) {
    return book < 470;
  }
  isBookNew(book: number) {
    return book >= 470;
  }

  getOrderIndex(book: number): number {
    const oIndex = this.getOldIndex(book);
    return oIndex > -1 ? oIndex : (this.old.length + this.getNewIndex(book) );
  }

  // get index of book in old testament array
  getOldIndex(book: number) {
    return this.old.indexOf(this.bookIndex[book]);
  }

  // get index of book in new testament array
  getNewIndex (book: number) {
    return this.new.indexOf(this.bookIndex[book]);
  }

  reset() {
    this.old = [];
    this.new = [];
    this.bookIndex = {};
  }

  getChapters(book: number): IChapter[] {
    return (this.bookIndex && this.bookIndex[book] ? this.bookIndex[book].chapters : [] );
  }

  resetSelectedChapter(chapter: number): void {
    this.selectedChapter = {
      number: chapter,
      verses: [],
      isBookmarked: false
    };
  }
}

export {IBookmarkHistory, IHighlight, IVerse, IChapter, IBook, IBible, Bible}
