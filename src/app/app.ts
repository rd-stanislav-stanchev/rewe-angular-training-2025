import {Component, Input} from '@angular/core';
import {MatFormField} from '@angular/material/input';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatListOption, MatSelectionList} from '@angular/material/list';

// TASK
//
// 1. ADD button:
//   - Enabled when no items are available
// - Enabled when the search string does not contain the item we search for
//   - After clicking ADD - clear the search criteria and show all items
// 2. Search:
//   - Filters the existing items based on the search criteria
// - When empty - display all of the items
// 3. DELETE button
// - Enabled when any item checkbox is clicked
// - Deletes all of the checkboxed items
// - After clicking DELETE - clear the search criteria and show all items

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

  @Input()
  inputData: string = ""

  protected onAdd() {
    this.inputItems.push({value: this.inputData, selected: false});
    this.clearInput();
  }

  protected onDelete() {
    let newArray: InputItem[] = [];
    for (let item of this.inputItems) {
      if (!item.selected) {
        newArray.push(item);
      }
    }
    this.inputItems = newArray;
    this.clearInput();
  }

  private clearInput() {
    this.inputData = "";
  }

  protected onSelectChanged(item: InputItem) {
    item.selected = !item.selected;
  }

  protected isAddEnabled() {
    return (this.inputItems.length === 0 || this.publicData().length === 0) && this.inputData.length > 0;
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
