import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from '../shared/pages.service';
import { BookmarksService } from './bookmarks.service';
import { SuperCar } from '../collection/super-car';
import { deleteAnim } from '../animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  animations: [deleteAnim]
})
export class BookmarksComponent implements OnInit, OnDestroy {

  bookmarkedSupers: SuperCar[] = [];
  noBookmarks = true;
  bookmarksSubscription: Subscription;

  constructor(
    private _pagesService: PagesService, 
    private _bookmarksService: BookmarksService) { }

  ngOnInit() {
    this._pagesService.bannerContent.next({title: 'Super Bookmarks'});

    this.bookmarkedSupers = this._bookmarksService.getBookmarkedSuper();

    this.bookmarksSubscription = this._bookmarksService.noBookmarksSubject
    .subscribe(val => (this.noBookmarks = val));
  }

  deleteBookmark(code: string) {
    this._bookmarksService.removeBookmarkItem(code);
    this._bookmarksService.updateLocalStorage();

    this.bookmarkedSupers = this._bookmarksService.getBookmarkedSuper();
  }

  ngOnDestroy() {
    this.bookmarksSubscription.unsubscribe();
  }

}
