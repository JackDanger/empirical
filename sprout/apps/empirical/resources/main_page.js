// ==========================================================================
// Project:   Empirical - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

// This page describes the main user interface for your application.  
Empirical.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),

    topView: SC.ToolbarView.design({
      layout: {top: 0, left: 0, right: 0, height: 36},
      childViews: 'labelView addButton'.w(),
      anchorLocation: SC.ANCHOR_TOP,

      labelView: SC.LabelView.design({
        layout: { centerY: 0, height: 24, left: 8, width: 200},
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'Hosts'
      }),
      
      addButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 100},
        title: 'View Host'
      })

    }),

    middleView: SC.View.design({
      childViews: 'hostLabel hostView sessionLabel sessionView pathLabel pathView'.w(),

      hostLabel: SC.LabelView.design({
        layout: {top: 46, height: 20, left: 20, width: 200},
        value: 'Select a hostname:'
      }),

      hostView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {top: 66, bottom: 32, left: 20, width: 200},
        backgroundColor: 'white',
        contentView: SC.ListView.design({
          contentBinding: 'Empirical.hostsController.arrangedObjects',
          selectionBinding: 'Empirical.hostsController.selection',
          contentValueKey: 'name',
          target: 'Empirical.hostsController',
          action: 'changeHost'
        }),
        
      }),

      sessionLabel: SC.LabelView.design({
        layout: {top: 46, height: 20, left: 240, width: 200},
        value: 'Sessions for %'
      }),

      sessionView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {top: 66, bottom: 32, left: 240, width: 200},
        backgroundColor: 'white',
        contentView: SC.ListView.design({
          contentBinding: 'Empirical.sessionsController.arrangedObjects',
          selectionBinding: 'Empirical.sessionsController.selection',
          contentValueKey: 'name',
          target: 'Empirical.sessionsController',
          action: 'changeSession'
        })
      }),

      pathLabel: SC.LabelView.design({
        layout: {top: 46, height: 20, left: 460, width: 400},
        value: 'Paths for %'
      }),

      pathView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {top: 66, bottom: 32, left: 460, width: 400},
        backgroundColor: 'white',
        contentView: SC.ListView.design({
          contentBinding: 'Empirical.pathsController.arrangedObjects',
          selectionBinding: 'Empirical.pathsController.selection',
          contentValueKey: 'display'
        })
      })
    }),

    bottomView: SC.ToolbarView.design({
      layout: {bottom: 0, left: 0, right: 0, height: 32},
      childViews: 'summaryView'.w(),
      anchorLocation: SC.ANCHOR_BOTTOM,

      summaryView: SC.LabelView.design({
        layout: { centerY: 0, height: 18, left: 20, right: 20 },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: "Empirical.hostsController.summary"
      })
    })

  })

});
