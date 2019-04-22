//import MainPlayer from 'Game/entities/players/main';
//import NPC from 'Game/entities/players/npc';
//import Other from 'Game/entities/players/other';

function getSpritesheet(entity) {
  if ( entity.settings.image.src ) {
    return entity.settings.image.src.split('/').pop().split('.')[0];
  }

  return entity.settings.image.split('.')[0];
}

function anchorPointFor(entity) {
  const spritesheet = getSpritesheet(entity);

  switch(spritesheet) {

    case 'male_main':
      entity.anchorPoint.set(-0.5, -0.5);
      break;

    case 'professor_oak':
      entity.anchorPoint.set(-0.5, -0.5);
      break;

    default:
      entity.anchorPoint.set(0.5, 0.5);
  }
}

export default (entity) => {
  anchorPointFor(entity);
};