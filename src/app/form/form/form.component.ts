import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormService } from './../services/form.service';
import { SubmitPayload } from 'src/app/interfaces/submit-payload.interface';
import { atLeastOneValidator } from '../validators/at-least-one.validator';
import { jokeTypeValidator } from '../validators/joke-type.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  jokeForm: FormGroup;
  response: string = '';

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.jokeForm = new FormGroup({
      category: new FormControl('Misc'),
      type: new FormControl('single'),

      joke: new FormControl(''),
      setup: new FormControl(''),
      delivery: new FormControl(''),

      flags: new FormGroup({
        nsfw: new FormControl(false),
        religious: new FormControl(false),
        political: new FormControl(false),
        racist: new FormControl(false),
        sexist: new FormControl(false),
        explicit: new FormControl(false),
      }, { validators: atLeastOneValidator }),
    }, { validators: jokeTypeValidator });
  }

  onSubmit(): void {
    const joke: SubmitPayload = {
      formatVersion: 3,
      category: this.jokeForm.get('category')?.value,
      type: this.jokeForm.get('type')?.value,
      joke: this.jokeForm.get('joke')?.value,
      setup: this.jokeForm.get('setup')?.value,
      delivery: this.jokeForm.get('delivery')?.value,
      flags: {
        nsfw: this.jokeForm.get('flags')?.get('nsfw')?.value,
        religious: this.jokeForm.get('flags')?.get('religious')?.value,
        political: this.jokeForm.get('flags')?.get('political')?.value,
        racist: this.jokeForm.get('flags')?.get('racist')?.value,
        sexist: this.jokeForm.get('flags')?.get('sexist')?.value,
        explicit: this.jokeForm.get('flags')?.get('explicit')?.value,
      },
      lang: 'en',
    };
    this.formService.submitJoke(joke).subscribe(res => {
      this.response = res.message;
    });
  }

}

