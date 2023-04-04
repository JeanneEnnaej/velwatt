// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import GameAnimatedController from "./game_animated_controller"
application.register("game-animated", GameAnimatedController)

import GameConfigController from "./game_config_controller"
application.register("game-config", GameConfigController)

import GameThreeController from "./game_three_controller"
application.register("game-three", GameThreeController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import NavContactController from "./nav_contact_controller"
application.register("nav-contact", NavContactController)

import QuizzAnswerController from "./quizz_answer_controller"
application.register("quizz-answer", QuizzAnswerController)

import TestController from "./test_controller"
application.register("test", TestController)

import TimerController from "./timer_controller"
application.register("timer", TimerController)
