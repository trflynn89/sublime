const Clutter = imports.gi.Clutter;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Volume = imports.ui.status.volume;

const VolumeScrollerIcons =
[
    'audio-volume-muted-symbolic',
    'audio-volume-low-symbolic',
    'audio-volume-medium-symbolic',
    'audio-volume-high-symbolic'
];

class VolumeScroller
{
    constructor()
    {
       this.controller = Volume.getMixerControl();

       this.volume_max = this.controller.get_vol_max_norm();
       this.volume_step = 0.05 * this.volume_max;

       this.panel = Main.panel;
       this.sink = null;

       this.scroll_binding = null;
       this.sink_binding = null;
    }

    enable()
    {
        this.panel.reactive = true;

        if (this.scroll_binding !== null)
        {
            this.disable();
        }

        this.sink = this.controller.get_default_sink();

        this.scroll_binding = this.panel.actor.connect(
            'scroll-event',
            (actor, event) => this._handle_scroll(actor, event));

        this.sink_binding = this.controller.connect(
            'default-sink-changed',
            (controller, id) => this._handle_sink_change(controller, id));
    }

    disable()
    {
        if (this.scroll_binding !== null)
        {
            this.panel.actor.disconnect(this.scroll_binding);
            this.controller.disconnect(this.sink_binding);

            this.sink = null;

            this.scroll_binding = null;
            this.sink_binding = null;
        }
    }

    _handle_scroll(actor, event)
    {
        let volume = this.sink.volume;

        switch (event.get_scroll_direction())
        {
            case Clutter.ScrollDirection.UP:
                volume += this.volume_step;
                break;

            case Clutter.ScrollDirection.DOWN:
                volume -= this.volume_step;
                break;

            default:
                return Clutter.EVENT_PROPAGATE;
        }

        volume = Math.min(volume, this.volume_max);
        volume = Math.max(volume, 0);

        this.sink.volume = volume;
        this.sink.push_volume();

        this._show_volume(volume / this.volume_max);
        return Clutter.EVENT_STOP;
    }

    _handle_sink_change(controller, id)
    {
        this.sink = controller.lookup_stream_id(id);
    }

    _show_volume(percentage)
    {
        let n;

        if (percentage === 0)
        {
            n = 0;
        }
        else
        {
            n = parseInt(3 * percentage + 1);
            n = Math.max(1, n);
            n = Math.min(3, n);
        }

        const monitor = -1; // Display volume on all panels.
        const icon = Gio.Icon.new_for_string(VolumeScrollerIcons[n]);
        const label = this.sink.get_port().human_port;

        Main.osdWindowManager.show(monitor, icon, label, percentage);
    }
};

let volume_scroller = null;

function init()
{
    volume_scroller = new VolumeScroller();
}

function enable()
{
    volume_scroller.enable();
}

function disable()
{
    volume_scroller.disable();
}
