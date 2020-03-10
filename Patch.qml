import QtQuick 2.14
import "lib.js" as Lib

Rectangle {
	Image {
		id: drag_img
		visible: false
		anchors.margins: 3
	}
	MouseArea {
		property var drag_target
		anchors.fill: parent
		onPressed: drag_target = Lib.onMoveStart(parent, mouse, PatchObject, drag_img);
		onReleased: drag_target = Lib.onMoveStop(drag_target, drag_img);
		onPositionChanged: Lib.onMove(parent, mouse, PatchObject, drag_target, drag_img);
	}
}
