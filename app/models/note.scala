package models

case class Notes( title: String,
                 note: String,
                 active: Boolean)
object JsonFormats {
  import play.api.libs.json.Json

  // Generates Writes and Reads for Feed and User thanks to Json Macros
  implicit val noteFormat = Json.format[Notes]
}