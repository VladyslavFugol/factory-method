interface FeatureConfig<T> {
  name: string;
  isDisabled: (items: T[]) => boolean;
  action: (items: T[]) => void;
}

interface Feature<T> {
  name: string;
  isDisabled: boolean;
  action: () => void;
}

class ShareFeature<T> implements Feature<T> {
  name: string = '';
  isDisabled: boolean = false;
  action():void {};

  constructor(items: T[], featureSettings: FeatureConfig<T>) {
    this.name = featureSettings.name;
    this.isDisabled = featureSettings.isDisabled(items);
    this.action = featureSettings.action.bind(this, items);
  }
}

abstract class FeatureFactory<T> {
  abstract createFeature(featureSettings: FeatureConfig<T>): Feature<T>;
}

class ShareFeatureFactory<T> extends FeatureFactory<T> {
  private items: T[] = [];

  constructor(items: T[]) {
    super();
    this.items = items;
  }

  createFeature(featureSettings: FeatureConfig<T>): Feature<T> {
    return new ShareFeature(this.items, featureSettings);
  }
}


