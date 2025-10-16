import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service.';



@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.html',
  styleUrl: './tarjeta-credito.css'
})
export class TarjetaCredito {
  listTarjetas: any[] = [ ];
  accion: string = 'Agregar'
  id: number | undefined;

  form: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjeta: TarjetaService
  ){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaexpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]

    })
  }
  ngOnInit(): void{
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjeta.getListTarjetas().subscribe
    ((data: any) => {
      console.log(data);
      this.listTarjetas = data;
    }, (error: any) => {
      console.log(error);
    })
  }

  guardarTarjeta(){


  const tarjeta: any = {
    titular: this.form.get('titular')?.value,
    numeroTarjeta: this.form.get('numeroTarjeta')?.value,
    fechaexpiracion: this.form.get('fechaexpiracion')?.value,
    cvv: this.form.get('cvv')?.value
    }

    if(this.id == undefined){
      // agregamos una nueva tarjeta
      this._tarjeta.saveTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('La Tarjeta fue registrada con exito', 'Tarjeta Registrada');
      this.obtenerTarjetas();
      this.form.reset();

    }, error => {
      this.toastr.error('Opss.. Ocurrio un error','Error')
      console.log(error);
    })

    }else{

      tarjeta.id = this.id;
      //editamos tarjeta
      this._tarjeta.updateTarjeta(this.id,tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta actualizada');
        this.obtenerTarjetas();

      }, error=>{
        console.log(error);
      }
      )
    }
      



  }

  eliminarTarjeta(id: number){
    this._tarjeta.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La Tarjeta Fue Elminada Con exito', 'Tarjeta Eliminada');
      this.obtenerTarjetas();

    }, error => {
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any){
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaexpiracion:tarjeta.fechaexpiracion,
      cvv: tarjeta.cvv
    })

}


}

