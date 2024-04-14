import {
  COMPLETE_HANGUL_START_CHARCODE,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
} from './constants';
import { canBeChosung, canBeJongsung, canBeJungsung } from './utils';

export function combineHangulCharacter(firstCharacter: string, middleCharacter: string, lastCharacter: string = '') {
  if (
    canBeChosung(firstCharacter) === false ||
    canBeJungsung(middleCharacter) === false ||
    canBeJongsung(lastCharacter) === false
  ) {
    throw new Error(`Invalid hangul Characters: ${firstCharacter}, ${middleCharacter}, ${lastCharacter}`);
  }

  const 중성개수 = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.length;
  const 종성개수 = HANGUL_CHARACTERS_BY_LAST_INDEX.length;

  const 초성인덱스 = HANGUL_CHARACTERS_BY_FIRST_INDEX.indexOf(firstCharacter);
  const 중성인덱스 = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.indexOf(middleCharacter);
  const 종성인덱스 = HANGUL_CHARACTERS_BY_LAST_INDEX.indexOf(lastCharacter);

  const unicode =
    COMPLETE_HANGUL_START_CHARCODE + 초성인덱스 * 중성개수 * 종성개수 + 중성인덱스 * 종성개수 + 종성인덱스;

  return String.fromCharCode(unicode);
}
