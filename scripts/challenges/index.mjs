import { easyChallenges } from './easy.mjs';
import { mediumChallenges } from './medium.mjs';
import { hardChallenges } from './hard.mjs';
import { veryHardChallenges } from './very-hard.mjs';

export const challenges = [
  ...easyChallenges,
  ...mediumChallenges,
  ...hardChallenges,
  ...veryHardChallenges,
];
