import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Survey from 'survey-angular';
declare var noUiSlider: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sliderWidget: any;
  surveyModel: any;
  questionnaire: any;
  questions: any;
  constructor(public navCtrl: NavController) {}
  ionViewDidEnter() {
    var questions = {
      "questions": [
        {
          "type": "comment",
          "name": "190_239",
          "title": "Eneter your comments",
          "isRequired": false,
          "validators": [

          ]
        },
        {
          "type": "checkbox",
          "name": "156_190",
          "title": "Test",
          "isRequired": false,
          "renderAs": "nouislider"
        }
      ],
      "answeredOptions": {

      },
      "questionnaireId": 5,
      "name": "DM",
      "description": "DM",
      "status": "COMPLETED",
      "unreadCommentsCount": 0,
      "validations": {
        "mandatoryQuestionNames": [

        ],
        "uiSlider": {
          "177_225": {
            "step": "0.5",
            "start": "75.0",
            "min": "50.0",
            "max": "100.0"
          }
        },
        "multipleTextValidations": {

        },
        "dateValidations": {

        },
        "textAreaValidations": {

        },
        "inputMaskedField": {

        },
        "rankList": [

        ]
      }
    };
    this.questionnaire = questions;
    this.questions = { 'questions': this.questionnaire['questions'] };
    console.log('this.questions',this.questions)
    this.surveyModel = new Survey.Model(questions);
    Survey.JsonObject.metaData.addProperty('checkbox', { name: 'renderAs', default: 'standard', choices: ['standard', 'nouislider'] });
    this.createSlider();
    Survey.CustomWidgetCollection.Instance.addCustomWidget(this.sliderWidget);

    Survey.Survey.cssType = 'bootstrap';
    Survey.defaultBootstrapCss.navigationButton = 'btn btn-primary';
    Survey.defaultBootstrapCss.navigation.complete = 'complete-btn';
    Survey.defaultBootstrapCss.row = 'row question-box';
    Survey.defaultBootstrapCss.multipletext.root = 'multipletext';
    Survey.defaultBootstrapCss.saveData.error = 'error-msg-box font-weight-mid header-padding-tiny';
    this.surveyModel.questionErrorLocation = 'top';

    if (document.getElementById('surveyElement')) {
      Survey.SurveyNG.render('surveyElement', {
        model: this.surveyModel
      });
    }
    

  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
  }
  createSlider() {
    const self = this;
    this.sliderWidget = {
      name: 'nouislider',
      htmlTemplate: '<div id="slider"></div>',
      isFit: function (question) {
        return question.name === "156_190";
      },
      afterRender: (question, el) => {
        
        const slider = el.querySelector('#slider');
        const startPoint = '10';
        noUiSlider.create(slider, {
          start: 0,
          connect: [true, false],
          step: 5,
          pips: {
            mode: 'steps',
            stepped: true
          },
          range: {
            'min': 0,
            'max': 25
          },
          tooltips: [true]
        });
        console.log('here', question.name === "156_190")
        
        slider.noUiSlider.on('set', function () {
          question.value = slider.noUiSlider.get();
        });
      },
      willUnmount: function (question, el) {
        const slider = el.querySelector('#slider');
        slider.noUiSlider.destroy();
      }
    };
  }
  

}
