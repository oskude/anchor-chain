// get distance between two cartesian coordinates
function getDistance (from_x, to_x, from_y, to_y)
{
	let x = to_x - from_x;
	let y = to_y - from_y;
	return Math.sqrt(x*x + y*y);
}

// get nearest anchor of an item, relative to a cartesian x,y position
// its a little lazy, and measures to the center point of an anchor!
function getNearestAnchor (from_x, from_y, item)
{
	let d     = Infinity;
	let a     = null;
	let wiha  = item.width / 2;
	let testd = d;

	for (let anchor of ["top","right","bottom","left"]) {
		switch (anchor) {
			case "top": testd = getDistance(
				from_x, item.x + wiha,
				from_y, item.y
			); break;
			case "right": testd = getDistance(
				from_x, item.x + item.width,
				from_y, item.y + wiha
			); break;
			case "bottom": testd = getDistance(
				from_x, item.x + wiha,
				from_y, item.y + item.height
			); break;
			case "left": testd = getDistance(
				from_x, item.x,
				from_y, item.y + wiha
			); break;
		}
		if (testd < d) {
			d = testd;
			a = anchor;
		}
	}

	return {d, a};
}

function getNearestItemAndAnchor (
	from_x,
	from_y,
	in_parent,
	of_type,
	ignore_me
){
	let item     = null;
	let anchor   = null;
	let shortest = 9000;

	for (let i in in_parent.children) {
		let child = in_parent.children[i];
		if (child == ignore_me) continue;

		// TODO: upstream bug? TypeError: Type error
		//if (!item instanceof of_type) continue;
		if (child instanceof of_type) {
			let near = getNearestAnchor(from_x, from_y, child);
			if (near.d < shortest) {
				item     = child;
				anchor   = near.a;
				shortest = near.d;
			}
		}
	}

	return {item, anchor};
}

function onMoveStart (
	patch,
	mouse,
	of_type,
	drag_img
){
	let target = patch.childAt(mouse.x, mouse.y);
	if (target instanceof of_type) {
		target.grabToImage((img)=>{
			drag_img.source = img.url;
		});
		drag_img.x = target.x;
		drag_img.y = target.y;
		target.visible = false;
		drag_img.visible = true;
	}

	return target;
}

function clearAnchors (item)
{
	item.anchors.top = undefined;
	item.anchors.right = undefined;
	item.anchors.bottom = undefined;
	item.anchors.left = undefined;
	item.anchors.horizontalCenter = undefined;
	item.anchors.verticalCenter = undefined;
	item.anchors.topMargin = undefined;
	item.anchors.rightMargin = undefined;
	item.anchors.bottomMargin = undefined;
	item.anchors.leftMargin = undefined;
}

function onMoveStop (
	drag_target,
	drag_img
){
	clearAnchors(drag_target);
	for (let anchor of ["top","right", "bottom", "left",
		"topMargin", "leftMargin"
	]) {
		// TODO: i dont want to have to worry about this!!!
		if (drag_img.anchors[anchor] > 0) {
			drag_img.anchors[anchor] = 10; // yeah, dont change your main margin...
		}
		// TODO: "Cannot anchor to a null item." and how does one check for that?
		drag_target.anchors[anchor] = drag_img.anchors[anchor];
	}
	drag_target.visible = true;
	drag_img.visible = false;
	drag_target = null;

	return drag_target;
}

function onMove (
	patch,
	mouse,
	of_type,
	drag_target,
	drag_img
){
	if (drag_target) {
		let near = getNearestItemAndAnchor(
			mouse.x,
			mouse.y,
			patch,
			of_type,
			drag_target
		);
		clearAnchors(drag_img, 3);
		switch (near.anchor) {
			case "top":
				drag_img.anchors.bottom = near.item.top;
				//drag_img.anchors.horizontalCenter = near.item.horizontalCenter;
				drag_img.anchors.left = near.item.left;
				drag_img.anchors.leftMargin = 0;
				break;
			case "right":
				drag_img.anchors.left = near.item.right;
				//drag_img.anchors.verticalCenter = near.item.verticalCenter;
				drag_img.anchors.top = near.item.top;
				drag_img.anchors.topMargin = 0;
				break;
			case "bottom":
				drag_img.anchors.top = near.item.bottom;
				//drag_img.anchors.horizontalCenter = near.item.horizontalCenter;
				drag_img.anchors.left = near.item.left;
				drag_img.anchors.leftMargin = 0;
				break;
			case "left":
				drag_img.anchors.right = near.item.left;
				//drag_img.anchors.verticalCenter = near.item.verticalCenter;
				drag_img.anchors.top = near.item.top;
				drag_img.anchors.topMargin = 0;
				break;
		}
	}
}
