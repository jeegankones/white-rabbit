import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  readonly pageTitle = 'Notifications';

  readonly pageItems = [
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone joined a room you follow',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Your friend just arrived at a room you follow',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
    {
      label: 'Someone just posted an event',
      location: '123 North Atlantic Dr.',
    },
  ];

  constructor() {}

}
