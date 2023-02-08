import { Forage } from './wizard.model';
import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListItem, Step } from 'carbon-components-angular';
import { Observable } from 'rxjs'
import { WizardService } from './wizard.service';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';

const URL = 'http://localhost:8080/api/forages';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.biss.html',
  styleUrls: ['./wizard.component.biss.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {

  @ViewChild('assignGridRef', { static: false }) dataGrid: DxDataGridComponent;


  steps: Step[];
  currentStep: number = 0;
  assignDataSource: any;
  groupDropdownItems$: Observable<ListItem[]>;
  technDropdownItems$: Observable<ListItem[]>;
  selectedRows: number[] = [];
  showHeaderFilter: boolean;
  showFilterRow: boolean;
  selectedRowsData : any[];

  constructor(private wizardService: WizardService, private fb: FormBuilder){
    this.assignDataSource = new CustomStore({
      key: 'id',
      load: ()=> {
        console.log("Load function called");
        console.log(this.wizardService.sendRequest(`${URL}`));
        return this.wizardService.sendRequest(`${URL}`);
      },

      insert: (values) => {
          console.log("Insert function called");
          console.log(JSON.stringify(values));
          return this.wizardService.sendRequest(`${URL}`, 'POST', 
            JSON.stringify(values)
          )
      },
      update: (key, values) => {
        console.log("Update function called");
        console.log(key);
        console.log(values);
        return this.wizardService.sendRequest(`${URL}/${key}`, 'PUT', JSON.stringify(values))
      },
      remove: (key) => {
        console.log("Remove function called");
        return this.wizardService.sendRequest(`${URL}/${key}`, 'DELETE')
      }
    }),

    this.showFilterRow = false;
    this.showHeaderFilter = false;

    this.steps = this.wizardService.getInitialSteps();
  }  

  globalForm =  this.fb.group({
    addForm: new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      group: new FormControl(''),
      techn: new FormControl(''),
      model: new FormControl('', [Validators.required]),
      man: new FormControl(''),
      description: new FormControl(''),
      sharedSecret: new FormControl('', [Validators.required]),
      confirmSecret: new FormControl('', [Validators.required])
    }),
    assignForm: new FormGroup({
      details: new FormArray([])
    }),
    locationForm: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      timezone: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      elevation: new FormControl('')
    }),
    customAttributesForm: this.fb.group({
      attributes: this.fb.array([])
    })
  })

  ngOnInit(): void {
    this.groupDropdownItems$ = this.wizardService.getGroupItemList();
    this.technDropdownItems$ = this.wizardService.getTechnItemList();
  }

  ngAfterViewInit(): void {
    //this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
  }

  get attributes(){
    return this.globalForm.get('customAttributesForm')?.get('attributes') as FormArray;
    //return this.globalForm.controls["customAttributesForm"].controls["attributes"] as FormArray;
  }

  nextStep(){
    ++this.currentStep;
   /*  if (this.step <= 4){
      ++this.step;
    } */
  }

  previousStep(){
    --this.currentStep;
    /* if (this.step >= 1){
      --this.step;
    } */
  }

  addAttribute(){
    const attributesForm = this.fb.group({
      key: new FormControl(''),
      value: new FormControl('')
    });
    this.attributes.push(attributesForm);
  }

  deleteCustomAttribute(index: number){
    this.attributes.removeAt(index);
  }

  /* getSelectedData(): Forage[] {
    console.log(this.assignGrid.instance.getSelectedRowsData());
    return this.assignGrid.instance.getSelectedRowsData();
  } */

  submit(){
    console.log(this.globalForm);
    
  }
  
}

@Pipe({ name: 'stringifyData' })
export class StringifyDataPipe implements PipeTransform {
  transform(forages: Forage[]) {
    return forages.map((forage) => `${forage.country}`).join(', ');
  }
}
