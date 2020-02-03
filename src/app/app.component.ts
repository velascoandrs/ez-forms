import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {ToastService} from '../../projects/toast/src/lib/toast.service';
import {CityService} from './servicios/city.service';

@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'formularios';
  myConfiguration = [
    {
      controlName: 'uuid',
      type: {
        typeName: 'input'
      },
      disabled: true,
    },
    {
      controlName: 'password',
      type: {
        typeName: 'input',
        class: 'password',
      },
      validators: [
        Validators.required,
      ]
    },
    {
      controlName: 'birthday',
      placeholder: 'Enter your birthday date',
      hint: 'Enter a valid date',
      type: {
        typeName: 'date'
      },
      validators: [
        Validators.required,
      ]
    },
    {
      controlName: 'address',
      placeholder: 'Enter a complete address',
      type: {
        typeName: 'textarea',
        maxLength: 20,
      },
      validators: [
        Validators.required,
      ],
    },
    {
      controlName: 'email',
      validators: [
        Validators.required,
        Validators.email
      ],
      placeholder: 'Enter an email',
      type: {
        typeName: 'input',
        maxLength: 30,
      },
      errorMessages: {
        required: 'The email is mandatory',
        email: 'You must enter a valid email',
      },
      hint: 'Enter a valid email'
    },
    {
      controlName: 'civilState',
      placeholder: 'Choose a civil state',
      label: 'Civil state',
      hint: 'Please pick a Civil State',
      validators: [
        Validators.required
      ],
      type: {
        typeName: 'select',
        options: [
          {
            value: 1,
            label: 'Married'
          },
          {
            value: 2,
            label: 'Single'
          }
        ]
      },
    },
    {
      controlName: 'cities',
      type: {
        typeName: 'check',
        minRequired: 2,
        options: [
          {
            value: 1,
            label: 'Quito'
          },
          {
            value: 2,
            label: 'Cuenca'
          },
          {
            value: 3,
            label: 'Ambato'
          }
        ]
      },
      label: 'Cities',
      errorMessages: {
        required: 'select two cities at least',
      }
    },
    {
      controlName: 'favoriteFruit',
      validators: [
        Validators.required
      ],
      label: 'Favorite Fruit',
      type: {
        typeName: 'radio',
        options: [
          {
            value: 3,
            label: 'Apple'
          },
          {
            value: 1,
            label: 'Pear'
          },
          {
            value: 2,
            label: 'Pineapple'
          }
        ],
      },
    },
    {
      controlName: 'profilePicture',
      label: 'Profile Picture',
      hint: 'Please upload your profile picture',
      placeholder: 'Add your profile picture',
      type: {
        typeName: 'file',
        multiple: false,
        accept: 'image/*',
      },
    },
    {
      controlName: 'someFiles',
      label: 'Add Some Files',
      hint: 'Please upload your files',
      placeholder: 'Add Files',
      type: {
        typeName: 'file',
        multiple: true,
        accept: '*/*',
        showFile: true,
      },
    }
  ];
  configuracionFormularioBusqueda = [
    {
      controlName: 'userEmail',
      validators: [
        Validators.email
      ],
      label: 'Email address',
      placeholder: 'Enter an email',
      type: {
        typeName: 'input',
        maxLength: 30,
      },
      errorMessages: {
        required: 'The email is mandatory',
        email: 'You must enter a valid email',
      },
      hint: 'Enter a valid email'
    },
    {
      controlName: 'city',
      validators: [
        Validators.required
      ],
      label: 'City',
      placeholder: 'Example: Barcelona',
      type: {
        typeName: 'autocomplete',
        maxLength: 30,
        completeMethod: this.filterCityWithHttpService,
        nameAutoComplete: 'name',
        componentReference: this
      },
      errorMessages: {
        required: 'The city is mandatory',
      },
      hint: 'Search a city'
    },
  ];
  infoLoca = {
    userEmail: 'juan.pecados@mail.com',
    city: {id: 2894, name: 'Parbasdorf', country: 'AT', lat: '48.28333', lng: '16.6'},
  };
  usuario = {
    uuid: 1234,
    email: 'juan.pecados@mail.com',
    civilState: 1,
    otherDate: '2015-02-16',
    birthday: '1999-02-16',
    favoriteFruit: 1,
    password: '12133',
    address: 'Av. 1231',
    cities: [1, 2]
  };

  myToasterConfig = {
    success: {
      type: 'info',
      title: 'GOOD',
      body: 'All right!!'
    },
    fail: {
      type: 'warning',
      title: 'BAD',
      body: 'Someting was wrong!!'
    }
  };

  escucharDatosDelFormulario(evento) {
    this.usuario = evento ? evento : undefined;
    if (this.usuario) {
      console.log('todo OK: ', this.usuario);
    } else {
      console.log('todo mal');
    }
  }

  filterCity(event) {
    console.log('adad');
    const cities = ['New York', 'Mexico DF', 'Los Angeles', 'Lima', 'Cuenca', 'Quito', 'Tokyo', 'Caracas', 'Santiago', 'Barcelona'];
    if (event.query) {
      return cities.filter(
        (city) => {
          return city.includes(event.query);
        }
      );
    } else {
      return cities;
    }
  }


  constructor(
    private readonly _toastService: ToastService,
    private readonly _cityService: CityService
  ) {
    this._cityService.find('asd').subscribe(
      (respuesta) => {
        console.log(respuesta);
      }
    );
  }
  filterCityWithHttpService(event, contexto) {
    return contexto._cityService.find(event.query ? event.query : event);
  }
  mostrarMensaje() {
    const mensaje = {
      title: 'Errorcito',
      body: 'Algo salio mal, revisa el servidor',
      type: 'success',
    };
    this._toastService.showMessage(mensaje);
  }
}
