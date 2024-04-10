import { Idable } from '~/models';

export function updateArrayOnDragDrop<TValue extends Idable>(
    entities: TValue[],
    draggedEntity: TValue,
    droppedInEntity: TValue,
    moveToLeft: boolean
) {
    if (draggedEntity.id == droppedInEntity.id) return entities;
    const newEntities = entities.filter((e) => e.id !== draggedEntity.id);
    let indexDroppedIn = newEntities.findIndex((e) => e.id === droppedInEntity.id);
    if (!moveToLeft) indexDroppedIn += 1;
    newEntities.splice(indexDroppedIn, 0, draggedEntity);
    return newEntities;
}
