import { Injectable, Signal, signal } from "@angular/core";
import { ToDoListType } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

    private _toDoList = signal<ToDoListType[]>([
      {
        id: 0,
        title: 'Приготовить обед',
        description: 'Сытное и вкусное блюдо "с изюминкой", которое можно приготовить всего из 3 ингредиентов, - аппетитные, нежные и румяные яичные конвертики',
      },
      {
        id: 1,
        title: 'Помыть окна',
        description: 'В процессе оказания услуги происходит очистка москитных сеток, карнизов, жалюзи, удаление грязи между рам, а также полировка стекол специальными средствами.',
      },
      {
        id: 2,
        title: 'Пропылесосить в квартире',
        description: 'Если в доме нет моющего пылесоса, а тяжелые покрывала не помещаются в стиральную машинку, имеет смысл обратиться за услугами профессионалов. ',
      },
      {
        id: 3,
        title: 'Сходить в магазин за продуктами',
        description: 'Для экономного и эффективного похода в магазин за продуктами составьте список покупок, спланируйте меню, идите на сытый желудок и заглядывайте на верхние полки, избегая импульсивных трат.',
      },
    ]);

    public get toDoList(): Signal<ToDoListType[]> {
        return this._toDoList.asReadonly();
    }

    public add(title: string, description?: string): void {
        const trimmed = title?.trim();
        if (!trimmed) 
            throw new Error('Title is required');
        const current = this._toDoList();
        const newTodo: ToDoListType = {
            id: this._generateId(current),
            title: trimmed,
            description: description,
        };
        this._toDoList.set([...current, newTodo]);
    }

    public delete(id: number): boolean {
        const current = this._toDoList();
        const idx = current.findIndex(t => t.id === id);
        if (idx === -1) return false;

        const nextList = current.filter(t => t.id !== id);
        this._toDoList.set(nextList);
        return true;
    }

    public update(id: number, updates: Partial<ToDoListType>): void {
        const current = this._toDoList();
        const idx = current.findIndex(t => t.id === id);
        const updated = { ...current[idx], ...updates};
        const nextList = [...current];
        nextList[idx] = updated;
        this._toDoList.set(nextList);
    }

    private _generateId(items: ToDoListType[]): number {
        const maxId = items.length ? Math.max(...items.map(i => i.id)) : 0;
        return maxId + 1;
    }
}