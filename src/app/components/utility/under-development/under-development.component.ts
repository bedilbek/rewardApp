import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.scss']
})
export class UnderDevelopmentComponent {

  constructor(
    public dialogRef: MatDialogRef<UnderDevelopmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, text: string, actions: string[], colors: string[], spinner: boolean }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
