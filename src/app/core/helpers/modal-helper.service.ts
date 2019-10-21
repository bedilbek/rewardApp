import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UnderDevelopmentComponent } from '../../components/utility/under-development/under-development.component';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, text: string, actions: string[] = null, options?: {
    colors?: any[]
  }) {
    const dialogRef = this.dialog.open(UnderDevelopmentComponent, {
      // width: width,
      maxWidth: "1000px",
      data: { title: title, text: text, actions: actions, colors: options ? options.colors : null }
    });

    return dialogRef.afterClosed()
  }

  openDialogSp(id, title, data) {
    const dialogRef = this.dialog.open(UnderDevelopmentComponent, {
      maxWidth: "1000px",
      data: { id: id, title: title, source: data }
    });

    return dialogRef.afterClosed()
  }

  showSpinner() {
    const dialogRef = this.dialog.open(UnderDevelopmentComponent, {
      maxWidth: "300px",
      data: { spinner: true }
    });
    return dialogRef
  }
}
