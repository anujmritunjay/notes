import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  notes: any = [];
  notesForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.getAll()
  }

  createForm(){
    this.notesForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    })
  }

  isEdit: boolean = false
  editFormData: any

  addNotes(){
    if(this.editFormData && this.editFormData._id){
     const payload =  {
       title: this.notesForm.controls['title'].value,
       description: this.notesForm.controls['description'].value
      }
      this.commonService.updateNote(this.editFormData._id, payload ).subscribe(val =>{
        if(val){
          this.getAll();
        }
      })
    }else{
      this.commonService.addNotes(this.notesForm.value).subscribe(val =>{
        if(val){
          this.getAll();
        }
      })
    }

  }

  createClick(){
    this.editFormData = null;
    this.notesForm.reset();
  }

  editNote(data?){
    if(data && data._id){
      this.notesForm.patchValue({
        title: data.title,
        description: data.description
      })
      this.editFormData = data
    }
  }


  deleteNote(data){
    if(window.confirm('Are you sure to delete this note')){
      this.commonService.deleteNote(data._id).subscribe(val =>{
        if(val){
          this.getAll();
        }
      })
    }

  }



  async getAll(){
    this.commonService.getAllNotes().subscribe((val: any)=>{
      if(val.data){
        this.notes = val.data
      }
    })
  }

}
