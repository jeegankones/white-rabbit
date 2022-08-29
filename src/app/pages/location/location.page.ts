import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/interfaces/location';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../shared/interfaces/user';
import { Event } from './event';
import { LocationService } from '../../services/location.service';
import { Timestamp } from '@firebase/firestore';
import subHours from 'date-fns/subHours';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'wr-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterViewInit {
  location: Location;
  isFavorite = false;
  isFavoriteLoading = false;
  mapConfig: google.maps.MapOptions;
  userDoc: DocumentSnapshot<User>;
  events: {date: Date; title: string; description: string}[];

  constructor(private activatedRoute: ActivatedRoute,
              private alertController: AlertController,
              private toastController: ToastController,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private locationService: LocationService){
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.location = data.location;
      this.userDoc = data.user;
      this.mapConfig = {
        center: this.location.coordinates,
        zoom: 15,
        gestureHandling: 'none'
      };
      this.isFavorite = this.userDoc.get('favoriteLocationId') === this.location.id;

      // Get all events no older than 4 hours
      const fourHoursAgo = Timestamp.fromDate(subHours(new Date(), 4));
      this.afStore.collection<Event>(`/locations/${this.location.id}/events`, ref => ref.where('date', '>', fourHoursAgo))
        .get()
        .subscribe((eventsQuery) => {
          this.events = eventsQuery.docs
            .sort((a, b) => a.data().date.toMillis() - b.data().date.toMillis())
            .map((eventDoc) => ({...eventDoc.data(), date: eventDoc.data().date.toDate()}));
        });
    });
  }

  ngAfterViewInit() {
    this.locationService.getLocation(`${this.location.id}`).subscribe(location => {
      this.location = location;
    });
  }

  async setFavorite() {
    this.isFavoriteLoading = true;
    const user = await this.afAuth.currentUser;
    await this.afStore.doc(`/users/${user.uid}`).update({
      favoriteLocationId: this.isFavorite ? null : this.location.id
    });
    this.isFavorite = !this.isFavorite;
    this.isFavoriteLoading = false;
  }

  async handleIssueClick() {
    const user = await this.afAuth.currentUser;
    const alert = await this.alertController.create({
      header: 'Problem at this location?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
        {
          text: 'Submit',
          handler: (alertData) => {
            this.afStore.collection(`/locations/${this.location.id}/issues`).add({
              reportedDate: Timestamp.now(),
              resolved: false,
              description: alertData.issue,
              userId: user.uid
            }).then(async () => {
              const toast = await this.toastController.create({
                header: 'Issue submitted successfully',
                duration: 4000,
              });
              await toast.present();
            });
          }
        }],
      inputs: [
        {
          name: 'issue',
          type: 'textarea',
          placeholder: `Please describe what's wrong`,
        },
      ],
    });

    await alert.present();
  }

}
