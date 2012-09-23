define(['thrust', 'jquery', 'showdown'],
function (Thrust, $, Showdown)
{
    var converter = new Showdown.converter();
    $(function ()
    {
        $(document.body).delegate('a[rel=popover]', 'mouseover', function (e)
        {
            var $this = $(this);
            if (!$this.data('popover'))
            {
                var content = $this.data('content');
                content = converter.makeHtml(content.replace(/\\n/g, '\n'));
                $this.attr('data-content', content);
                if (!$this.attr('title'))
                    $this.attr('title', $this.text());
                $(this).popover().popover('show');
            }
        });

        $(document.body).delegate('a[rel=popover]', 'click', function (e)
        {
            e.preventDefault()
        });
    });

    Thrust.launch();
});