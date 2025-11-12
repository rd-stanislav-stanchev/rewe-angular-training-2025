import {Component, Input} from '@angular/core';
import {MatFormField} from '@angular/material/input';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatListOption, MatSelectionList} from '@angular/material/list';

interface InputItem {
  value: string,
  selected: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    MatSelectionList,
    MatListOption
  ]
})
export class App {

  inputItems: InputItem[] = []
  public public: InputItem[] = (() => this.publicData())();

  @Input()
  inputData: string = ""

  protected onAdd() {
    this.inputItems.push({value: this.inputData, selected: false});
    this.inputData = "";
  }

  protected onDelete() {
    let newArray: InputItem[] = [];
    for (let item of this.inputItems) {
      if (!item.selected) {
        newArray.push(item);
      }
    }
    this.inputItems = newArray;
  }

  protected onSelectChanged(item: InputItem) {
    item.selected = !item.selected;
  }

  protected filterItems() {

  }

  protected publicData() {
    if (this.inputData.length === 0) {
      return this.inputItems;
    }
    let filtered: InputItem[] = [];
    for (let inputItem of this.inputItems) {
      if (inputItem.value.includes(this.inputData)) {
        filtered.push(inputItem)
      }
    }

    return filtered;
  }

  protected hasSelectedItems() {
    for (let inputItem of this.inputItems) {
      if (inputItem.selected) {
        return false;
      }
    }
    return true;
  }
}
