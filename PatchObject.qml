import QtQuick 2.14

Rectangle {
	id: the
	property string text
	width: theText.contentWidth + 8;
	height: theText.contentHeight + 4;
	color: "transparent"
	border.width: 1
	anchors.margins: 10
	Text {
		id: theText
		text: the.text
		anchors.centerIn: parent
	}
}
