import { AppRoute } from 'common/enums/enums';

type LocationType = typeof window.location;

type Constructor = {
  location: LocationType;
};

class Navigation {
  private _location: LocationType;

  public constructor(params: Constructor) {
    this._location = params.location;
  }

  public getUrl(): string {
    return this._location.href;
  }

  public setPath(path: AppRoute): void {
    this._location.pathname = path;
  }

  public assignAnotherHost(url: string): void {
    this._location.assign(url);
  }
}

export { Navigation };
