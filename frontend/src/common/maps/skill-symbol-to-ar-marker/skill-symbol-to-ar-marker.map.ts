import aMarker from 'assets/img/ar-markers/a-marker.png';
import { AlphabetLetter } from 'common/enums/enums';

// AlphabetLetter

const skillSymbolToArMarker: Record<string, typeof aMarker> = {
  [AlphabetLetter.A]: aMarker,
};

export { skillSymbolToArMarker };
