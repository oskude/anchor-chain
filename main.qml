#!/usr/bin/qml

import QtQuick 2.14
import QtQuick.Window 2.14

Window {
	width: 320
	height: 240
	visible: true
	Patch {
		anchors.fill: parent
		PatchObject {
			anchors.centerIn: parent
			text: "the\nfirst"
		}
		PatchObject {
			x: 20; y: 20
			text: "a"
		}
		PatchObject {
			x: 60; y: 20
			text: "bb"
		}
		PatchObject {
			x: 100; y: 20
			text: "ccc"
		}
	}
}
