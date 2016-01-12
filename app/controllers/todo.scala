package controllers

import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import scala.concurrent.Future
import reactivemongo.api.Cursor
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import org.slf4j.{LoggerFactory, Logger}
import javax.inject.Singleton
import play.api.mvc._
import play.api.libs.json._

/**
 * The Users controllers encapsulates the Rest endpoints and the interaction with the MongoDB, via ReactiveMongo
 * play plugin. This provides a non-blocking driver for mongoDB as well as some useful additions for handling JSon.
 * @see https://github.com/ReactiveMongo/Play-ReactiveMongo
 */
@Singleton
class todo extends Controller with MongoController {

  private final val logger: Logger = LoggerFactory.getLogger(classOf[todo])

  def collection: JSONCollection = db.collection[JSONCollection]("notes")

  import models._
  import models.JsonFormats._

  def createNote = Action.async(parse.json) {
    request =>
      request.body.validate[Notes].map {
        note =>
          collection.insert(note).map {
            lastError =>
              logger.debug(s"Successfully inserted with LastError: $lastError")
              Created(s"User Created")
          }
      }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def findNotes = Action.async {
    val cursor: Cursor[Notes] = collection.
      find({Json.obj("active" -> true)}).
      cursor[Notes]

    val futureUsersList: Future[List[Notes]] = cursor.collect[List]()

  val futurePersonsJsonArray: Future[JsArray] = futureUsersList.map { notes =>
      Json.arr(notes)
    }
  
    futurePersonsJsonArray.map {
      notes =>
        Ok(notes(0))
    }
  }

  def updateNote(title: String, note: String) = Action.async(parse.json) {
    request =>
      request.body.validate[Notes].map {
        noteedit =>
          val noteSelect = Json.obj("title" -> title, "note" -> note)
          collection.update(noteSelect, noteedit).map {
            lastError =>
              logger.debug(s"Successfully updated with LastError: $lastError")
              Created(s"Note Updated")
          }
      }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def deleteNote(title: String, note: String) = Action.async(parse.json) {
    request =>
      request.body.validate[Notes].map {
        notedelete =>
          val noteSelect = Json.obj("title" -> title, "note" -> note)
          collection.remove(noteSelect, firstMatchOnly = true).map {
            lastError =>
              logger.debug(s"Successfuly deleted")
              Created(s"Note Deleted")
          }
      }.getOrElse(Future.successful(BadRequest("invalid json")))
    }
}
