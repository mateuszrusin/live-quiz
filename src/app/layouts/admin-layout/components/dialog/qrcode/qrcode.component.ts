import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QRCodeComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<QRCodeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    ngOnInit() {
        this.data = window.location.origin + this.data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
