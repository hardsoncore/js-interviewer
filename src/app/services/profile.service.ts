import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  get profile(): Observable<Profile> {
    return of(this._getDefaultProfile());
  }

  private _getDefaultProfile(): Profile {
    const defaultProfile: Profile = {
      username: 'JS_CODE_MASTER',
      avatarUrl: 'assets/avatar.jpeg',
    };

    return defaultProfile;
  }
}
