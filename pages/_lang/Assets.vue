<template>
  <div class="bkecf9f1">
    <div class="xl:w-1200 mx-auto">
      <div class="md:flex items-center h-auto md:h-220">
        <div class="m-2 md:m-0 md:w-240 bkffffff p-4 text-center h-full">
          <!-- <img
            class="mx-auto"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAYAAABUx/9/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMUExMzk0QjkwRDExRUI4ODZCQzA4OUM2ODM5OTBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMxMUExMzk1QjkwRDExRUI4ODZCQzA4OUM2ODM5OTBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzExQTEzOTJCOTBEMTFFQjg4NkJDMDg5QzY4Mzk5MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzExQTEzOTNCOTBEMTFFQjg4NkJDMDg5QzY4Mzk5MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ltdp0AAAh80lEQVR42uxd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"
            alt=""
          > -->
          <img
            src="/img/logo.jpg"
            class="w-24 mx-auto"
            alt=""
          >
          <!-- <div>
            <span class="cl02AD8F font-bold fs58">PHA</span>
          </div> -->

          <p class="mt-2">Hi,{{UserInfo.userName}}</p>
          <div class="mt-4">
            <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visible"
            >
              <p>确定要注销登录吗？</p>
              <div
                class="pt-2"
                style="text-align: right; margin: 0"
              >
                <el-button
                  size="mini"
                  type="text"
                  @click="visible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="logOut"
                >确定</el-button>
              </div>
            </el-popover>
            <el-button
              v-popover:popover5
              size="mini"
              class="fs14"
              type="primary"
            >
              注销
            </el-button>
            <el-button
              @click="dialogFormVisible = true"
              size="mini"
              class="fs14"
              type="primary"
            >
              修改密码
            </el-button>
          </div>
        </div>
        <div class="m-2 md:m-0 md:ml-4 bkffffff flex-1 p-4 h-full">
          <div class="flex items-center justify-between">
            <div class="marquee_box flex-1 flex items-center">
              <span class="flex-none">公告：</span>
              <marquee class="cl000000">近期因hpool官方对矿池异常账户进行清理，是为解决双挖、假算力、网络DDOS攻击等问题，从而确保矿工的利益。在此期间hpool矿池的提现速度降低，请各位会员稍多等待一段时间，给各位带来的不便，敬请谅解。</marquee>
            </div>
          </div>
          <div class="flex justify-between py-2">
            <span class="fs16 font-bold">账户:{{UserInfo.userName}}</span>
            <div>
              <el-button
                @click="dialogFormVisible2 = true"
                size="mini"
                class="fs14"
                type="primary"
              >
                提币
              </el-button>
            </div>
          </div>
          <div class="border-t border-b grid grid-cols-3 cl454545">
            <div class="py-4 fs16">
              <div class="flex items-center justify-center space-x-2">
                <img
                  class="w-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5M0RBNkVEQjg2QTExRUJCMzFGODBDQjQwNjZCNDk3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5M0RBNkVFQjg2QTExRUJCMzFGODBDQjQwNjZCNDk3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTkzREE2RUJCODZBMTFFQkIzMUY4MENCNDA2NkI0OTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTkzREE2RUNCODZBMTFFQkIzMUY4MENCNDA2NkI0OTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6UJtXRAAAIKklEQVR42qRYZ1AV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"
                  alt=""
                >
                <span>余额</span>
              </div>
              <div class="text-center mt-2 font-bold">
                <span class="fs24">{{Number(balanceDetailData.balance)}}</span>
                <span> PHA</span>
              </div>
            </div>
            <div class=" border-l border-r">
              <div class="py-4 fs16">
                <div class="flex items-center justify-center space-x-2">
                  <img
                    class="w-6"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRDNjg5MjNGQjkwRDExRUJCNzdFOEVGQzk0QjA0QTU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRDNjg5MjQwQjkwRDExRUJCNzdFOEVGQzk0QjA0QTU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REM2ODkyM0RCOTBEMTFFQkI3N0U4RUZDOTRCMDRBNTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REM2ODkyM0VCOTBEMTFFQkI3N0U4RUZDOTRCMDRBNTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5S6WVcAAAEH0lEQVR42qyWeWxUVRTGv1m6TDszbZkR2k6XtKFoWaRSCpW2RlsXBNooYjRETS0xiKImmpioNPqHgDHBDSVEG8UY/2hSFaMikiKLqUQQ26aJUtoilnaQblI7nZm+dorfeXk1w/BmETyTX2a5b+53z7nnnHsN5e98gCg2i6wjlaSIZBA7GSXnSBs5QL4gnkgTmSOMyaT1pI4k6IynaCwkD5ExIivfSkb0JjSGEdpATpFNYYT0zEaeJZ3knljEDORN0qCF6mrMST4nL0UL47vkCVy7yaJfJQHymp5ntf+TULBtI6tCPcskb+s9vdiVjvK8XOQ70pBmseASX/2jY+gcGELz6R5cGPNE81CSppD8bcq5u0Z+fJ2UBT8lE+++vwbrl9yIOJMJoz4/3BQZ8fqRkpiI5blZ2LC8GM7kJPx4tjda4ijksFmro7rQJ/asX4uO8xfw5GdfY1xRdGeZ65yF9+6rxmQggLeOHoskuFlCatQKNv6KSk6y4EBnd1ghse6hEbS7/0RZfm60vXOQleJZld7oRYZt66rb0TU4jOO9fer7sNcHs9GIdLsVC9JnY2m2C+k2qxqBGKxKxBbpjfgmJ/Hy/u9RmpuNcq783kXzYTIa1DHPhIKTfW7U72vG4LgXcygYgy0WsSy9ETuTQFb8Cyfd1fKT+pskiuyPWMF1DhRlZiDVkgiPMoE51mQc6v49kpjLrGXLFWaJM+O2uXnqvs2YCMnkr9xVCVeqHYOecShTAcSbTciw27BmwQ147stvw4nFm7UGatMLY/2dt2JlYQFazvxBLwdYX6N4eGkRirMzUbGz4fKZ6HXTow9G8kwRsT6t6C6zMf8EtjcfRWVBPmqXLVFD2NjagR5moEIPGx95QPXUy0UlxcfBlpCAwPSlSGL9ItahJyZ79gM9OtJzVv2ezAllqmduuRknz7mxrfkIqhm22dyrAY8H3/x6Gqvnz4sk1i51dlBvRFa7Ii/n3+/jyiS8ZJjZJ2EsYdp/8nMbdhxu4Xs7SnJcqFlYGEnsoHjWRHaGFrZMsH31HfjuVDfpUgv4L58P/qkptXXVlRbj+aoKTDN0ZpNRDfsAEyaMyWG636x9+JA8Hjz6/rETaGXab1xRgi1MFCnmxrYOhs2qNt9NTV+pz5n4e2B6Wv38VEVpODE5uhSDdgeRrv9bpAMzKzUFfiZDGtvYrnXVOENPj/f246Lfj1TubxlD7rQmoabh09C/ume6viHowiPn2UextAIHO33tspswz+lg8ZhZa1PoovjHJ1rV2gsyyak1ZF/oSb2HlMRygEqS7DjUEsu6XpwR0ruDbNaS5VpNPNoSfCXQE5OHniaPaZ3lamyIrNWudDFd5aQXXS9JSSZiFJHNekP7397/ekk9TzaSF0JuxJlaLw29Ee+NFo1/BBgAAkpkziJZMp8AAAAASUVORK5CYII="
                    alt=""
                  >
                  <span>提币金额</span>
                </div>
                <div class="text-center mt-2 font-bold">
                  <span class="fs24">{{Number(balanceDetailData.forzenBalance)}}</span>
                  <span> PHA</span>
                </div>
              </div>
            </div>
            <div>
              <div class="py-4 fs16">
                <div class="flex items-center justify-center space-x-2">
                  <img
                    class="w-6"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5RTQ5NUM4QjkwRDExRUJBNDE4RTI1RkQ0NjA4MDk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5RTQ5NUM5QjkwRDExRUJBNDE4RTI1RkQ0NjA4MDk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTlFNDk1QzZCOTBEMTFFQkE0MThFMjVGRDQ2MDgwOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlFNDk1QzdCOTBEMTFFQkE0MThFMjVGRDQ2MDgwOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5W3kqgAAADRElEQVR42qyWS0wTURSG/xkoAkoojaGA5VFABWyxAsUEJMgGE6MmbnRhogsfEHZKXJiQ6NK40OjCGGWjEVe68ZX4QiDEBBAUI6LyxhYQDdAC0qJlPHe4NXTo9GH4ky8zkzv3nplzzzn3CLuu3UIQGYkLRDmRTGgIgZCIRWKceEmcJ8YCLSQGGNtKdBGDxFEinYjihsCv64gM4gRhJ9r5x4VljP1uL7ED4clKDBCXQzHGnt/yLxXwf2LzThMtyjWUxjqIQqyNyohGNWM3iAKsrXYTl7wPkfyaT5zy93ZslAaHLWZkbdRBkiT/fiNnOV1uPPn0FT0Tk8rhWuIm0e811qC2R8d3FuKQxYQu23jAX8jTJ6IsMwP76+/6i4t7RHEkD1WT2iKp2ni0Do3g3OMXAY2ZkhJxcV+l2nARkSjyhFXV/OIiYiI1QTcnMW4D3B5PoAitE/kmhiyjLuGfv9N1WohCyBmyh7lRH46xis1G6OPM6J34gcqcbNTcf8SDJKhRg8hLUEBJWI7CbIrIydl57M3dgtqKUtgdThSmpshjf9Rd6FW0GE6lSEvQIiU+DkNT0/LzuHMW+clJ8r1nSQo2XRR59Q5JEeQqbUw0fZ2AJcq5hNgYaCLEUKcvifyYUC90giAvzuRwuch1s4iOjJADY8I5J7vVm9hBgsXFAuQ785By5KA5D439g5j5tYD1Ucuh3z5ql2nuH5IrSvPAsM+cOffyd1dkG/Ga3lHIxow18fPKt6jRhKoSq2xIuaiNAoOxUr89S8igVHhWdQxzlJt+jD0X6KQ28gNylYrTNuFIoQUFhmT0/5zC9dY2dHyz+7yjo31jJe2AKYfcOouHPZ/R0PlB3lOfgAaSBN4WfCS2qTnbnKxHTWkxTHQdnXbgassbjNHeVZdaUZ5lxPTCAm53vMeD7h61JdgZafUa2068C5YGBqqT1SVFsgGmkakZ1Ld1omm1y3yikMgh+rxVv5sfA1WBZtlmHKh7+ircM421CH3Kw7OaNzhrKdYanFVrC6xraLBVWeRFP/5lPUh9OJVlVSkFrvAeRAqllTtJ5PK9DEesYcoizoTbpH4hLEQmcYcY5aVNWvEHbmKYe8LAUpNQDc2/AgwAhc7w6jrE2qwAAAAASUVORK5CYII="
                    alt=""
                  >
                  <span>总收益</span>
                </div>
                <div class="text-center mt-2 font-bold">
                  <span class="fs24">{{Number(balanceDetailData.total)}}</span>
                  <span> PHA</span>
                </div>
              </div>
            </div>
          </div>
          <p class="fs18 mt-3">总算力：0 T</p>
        </div>
      </div>
      <div class="flex mt-4 h750">
        <div class="md:w-240 bkffffff text-center font-bold">
          <div
            style="background-color: #f2fbfb;"
            class="py-3 fs16 flex items-center justify-center space-x-2"
          >
            <img
              class="w-6"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5RDdEMzFEQjkwRTExRUJBNDczQjYyQkY5MjM3RjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5RDdEMzFFQjkwRTExRUJBNDczQjYyQkY5MjM3RjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTlEN0QzMUJCOTBFMTFFQkE0NzNCNjJCRjkyMzdGNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTlEN0QzMUNCOTBFMTFFQkE0NzNCNjJCRjkyMzdGNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JkpOqAAADTklEQVR42sxYyyt0YRx+5jgouRZfn3FNLmXpkrCwsxglC/IHKBsblJSihEhRbGXhDyBJUnaS7Vc2E6VQwxcW5M6Y93uf13dOc8aYYc5x+dU7p7mc3/u8z/O7nXEJIf4A+C1XAF9vmlx/dfnilusXvs80IvHje82v4QeYHvpBIBDA+vo6tra2cHl5Kbmyj5M+09PTUVNTA4/HA10P2VYGpk/8t/v7ezEwMCASExOFy+VyfCUkJIiuri5xd3cngszn4guDU16xtLSE1tZW5Ofno6+vT139fvshExcXB5/Ph5mZGRwcHGB6ehoSjPH1scmEpEy0tLQoxAsLC8Jpe3p6EouLi0ICEvX19RYmtCBZcHp6itTUVBQXFzsefGSjoKAAaWlpuLi4gJTEUixMkyyYgJw2+mSA8mrsExaEAYSoP8OMw4WC0MP98OrqSi2p47toTk5OVqkc6jymOhEfH69qQ39/PzIyMvDw8BD1ZLynqKgI7e3taGxsjAmIbi3iL+rs7++rgkIN3zJuxt/c3t5ic3MTy8vLGB8fR2dn54eBWEA8Pj4iJSUF8/PzqKurUxu8ZWTg+vpaAd/Y2EBPTw+Gh4dRXV2NioqK2EGQXmqcl5cHt9sdUYa9vT0MDg6irKwMQ0NDODs7w9jYGNbW1j4MQgu3QbQqSZlWVlaUBLOzswoQ44H3np+f229ghtaR6gUlYHnf3d1FSUmJWmSD9+bk5NgDQSfPz8/qZJmZmRFjQjYjdHd3qzSemJjA1NSUypKmpiZ7IOiY9aGjo0OdNlrlZHDe3Nwo8Lm5uRgdHUV5ebk9ENSam9fW1iIrK0tlS7TYSEpKUgy0tbWhsrLSfrEitUzRkZERlaLRApRMMX7IiKOTlSELnb+agD5x5LacjPpGqpT2xmrN9B8cb1pooLFfROsZsRr9UnIyTLZfyUGEDQ0Nqg/Mzc2pwYZNzKnxjo1RTmwq+6qqqixSmzMm3xweHqK5uRk7OzvIzs5GYWGhI9LwgCcnJ8o/C9vq6ipKS0vNGdMCgub1ejE5OYnt7W2zQTkxzHDmYAr39vaGpvJrEEb+Hx0dqTkw1kElXD1hUwyOhYggvtiOf8RjoPZWwfrKR1FdPQG9/Dfxbf9P/BNgAH91EDIV5xuVAAAAAElFTkSuQmCC"
              alt=""
            >
            <span>账户明细</span>
          </div>
          <ul class="mt-2">
            <li
              @click="clickTypeListIndex(index)"
              v-for="(item, index) in typeList"
              :key="index"
              :class="typeListIndex == index && 'cl02AD8F'"
              class="py-5 cursor-pointer"
            >{{item}}</li>
          </ul>
        </div>
        <div class="ml-2 md:ml-4 bkffffff flex-1">
          <div
            style="background-color: #f2fbfb;"
            class="py-3 fs16 pl-4 font-bold border-l-4 bc-02AD8F"
          >
            <span>{{typeListIndex == 0 ? '余额流水' : (typeListIndex == 1 ? '提币记录' : '算力明细')}}</span>
          </div>

          <div
            v-show="typeListIndex == 0"
            class="text-center py-6"
          >
            <el-table
              :data="balanceData"
              style="width: 100%"
            >
              <el-table-column
                prop="coinName"
                label="币种"
              >
              </el-table-column>
              <el-table-column
                prop="balance"
                label="余额"
              >
                <template slot-scope="scope">
                  <div>
                    {{Number(scope.row.balance)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="forzenBalance"
                label="提币金额"
              >
                <template slot-scope="scope">
                  <div>
                    {{Number(scope.row.forzenBalance)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div
            v-show="typeListIndex == 1"
            class="text-center py-6"
          >
            <el-table
              :data="myWithDrawData"
              style="width: 100%"
            >
              <el-table-column
                prop="coinName"
                label="币种"
              >
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <div>
                    {{scope.row.state == 0 ? '待审核' : (scope.row.state == 1 ? '审核通过' : scope.row.state == 2 ? '已完成' : scope.row.state == 3 ? '审核拒绝' : '')}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="数量"
              >
                <template slot-scope="scope">
                  <div>
                    {{Number(scope.row.amount)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div
            v-show="typeListIndex == 2"
            class="text-center py-6"
          >
            暂无数据
          </div>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      width="370px"
      :visible.sync="dialogFormVisible"
    >
      <div class="loginParameter security_alert ">
        <div class="login_list"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDN0RCNjIyQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDN0RCNjIzQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEM3REI2MjBBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEM3REI2MjFBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wxEmeAAABX1BMVEWz29rA4eC63t3H5OTZ7e3O6Oe94N/7/f39/v6/4eC7397Q6ej+//+23NvM5+bI5eTU6+rR6em8396+4N/K5uXP6Oj8/v7w+Pj3+/v2+/u43dzL5ubG5OO53t3q9fW029rT6ur5/PzB4eHJ5uXt9va33dzE4+LS6unC4uHN5+f+/v78/f3N5+b1+vrL5+a+4OC03NvF5OPp9fTL5uXu9/e13Nv4/PzJ5eXx+PjC4uLj8vHf8O/v9/fz+fnh8fC23dzV6+vy+fjk8vK6397s9vbd7+7W7Ovy+fno9PTY7eza7e3Z7ezx+fjR6ei43t3i8fH6/Pzl8/PD4uLn9PPB4uHA4eH0+vrY7Ozg8PDD4+Lh8fHf8PDl8/Lc7u7P6Ofj8vLt9/bH5eTn8/P6/f34+/ve7+/X7Ovm8/Pb7u7a7u3b7u3v+Pfw+PfX7Ozr9fXF4+Pn9PTV6+rW6+vp9PT///+ukfZ3AAAAdXRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCbsN7qAAAD90lEQVR42uzZ91/aQBQA8AMMQ1EcyBJEQAEH4sJtXbVua91Wa/fe7fv/P43JvUBCEi6Dfj79NO8nQ3L5Jube3cuFwF8I4iAO4iAO4iD/CfK+zz1B7I+huaiERPOkabFDkZWh5hnE7ROQYA9pZjwXkMdNNQgnIFlxo6fo3txsFaNbCK8UPXyUywExXEyRDSXE87oEpF3cuI6BT4zR0Ugk4hdiZCTIh6l+2++mD0VA8L5cs3bmxpX05GUIcUftMy6JBkJWB+0yBogmQsgTe4w7ooeQLRsIX4ioIznaF8gjy0b8jJ4qdaZANtZpTyaHFo35TXqi1nVOgezBTIru7PNbMR7ixQbi4FEg+wDbXrp78rV5YyeNJzkGSCqQFv6A2AJeRMmssYiPO3z/7/CoINVu4T4wZzxDY1jYVEUgOE0PSsyYMdbQ6AIdBKCXHtbeb9zoQmMP9BH4ikc+NWqM1bXUROBGeT1sEcHnOTEFjRH4gUqnkTTP4tNcBhYEBldpgzb2NG+lTbzbwIZAFJuEIwbTfEE28ekiUHLRRicxFuNUSsERYEdg9CWOcvONjQdo9Cp2NEAAOjBhGs6WLWgMgFEE2mjT9BRjCl6CcQQ6sfWGnsHhUUtgBoEPDHNyHx5zC+aQagH7S4MY9dADKt/ALAJTafmwqkzzc7r7aBnMIzBDC1oyprJTytnABVhBYCVATxTyKXcN4muNJwPWEIhgfXFe0pjNezR7BTOy1i5VaZ9V05ys7lpFemtqwYl+lTTXmxMYEU7+1nRbl+ZiFKwgOIDhoEzeivVGmG4WC7ozDxOC6Tw+Ij2Bd/zPfpxpvW+kW+LMIngf0/zfG9Xh3I9v/fn7rluQVVqGEaw+wmLy44oFl8T788vedzgzyDBtnMMpVrGkcKgs6TjjCKcw+OT31ho17zH7WkojhJP9r8SYPakan9RKYM4YgkaH7Fe/NHvcyA9fUh9G9RFOq8sUNN5fF1UvShfhtDvM/ZxcUSnGX9V0dyZkWKPCEVczBgqqawr9dFAOBZmQDsNFqji9VMRmyQgDEjZn8LMonRTyvobInFkDYJmma/G4AWLBAPhCK4JsRhfJWTH40iIhW9VSR8J6/YolDo5o/RLTRPr0Jge22KZrNOWYBjJu9T7u44IOo954/YrEbtVoA0sRo3N1d7wOuZJysMvqUlSGrp50x+4UyFan1puMiUW1SVr1XSuQhInXas0IzukuD9pi1Ix/ashP25ZsOQXSrjZvWw6pxkzVrtUL3djG6JQhHxH5XnTZF8V8da7kkUyqqZ82Xohfgk6baeTwm9bvSvO+NpWkr3PrySYZoXjtd8bFybT9RHnJ+SzrIA7iIP8u8keAAQDk72xp1NGk9AAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="UserInfo.userName"
              type="text"
              disabled="disabled"
              placeholder="请输入邮箱号"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCQ0IwMUZDQTBCMjExRUI5OTcyODE1OTAyMzRENUMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCQ0IwMUZEQTBCMjExRUI5OTcyODE1OTAyMzRENUMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUJDQjAxRkFBMEIyMTFFQjk5NzI4MTU5MDIzNEQ1QzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUJDQjAxRkJBMEIyMTFFQjk5NzI4MTU5MDIzNEQ1QzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz53jkr1AAABU1BMVEWz29q029r5/Pzy+fm6397t9/b1+vq23Nu63t3X7OvO6Oe33dz3+/u7397o9PTx+Pjk8vL7/f30+vrI5eS03Nu13Nvz+fnW7Ov+/v653t3Q6ej9/v6/4eDD4+Ln9PPa7e3g8PDV6+v6/f3R6ene7+/Y7ezC4uHL5ub+//+43dzN5+f4/Pzf8O/h8fDV6+r2+/vF4+PC4uK+4ODJ5eXE4+LA4eDr9vXu9/fq9fXd7+7s9vb6/PzK5uXn9PTm8/PN5+bj8vHp9fTZ7ezU6+rP6Ojw+Pjb7u3T6urH5OTS6unM5+bi8fH8/v7X7Oy+4N/A4eHt9vbc7u7B4uG43t38/f3L5+bx+fi94N/n8/Pc7+74+/vw+PfZ7e28397y+fjh8fHF5OPv9/fG5OPv+PfR6ejB4eHH5eTW6+vr9fXl8/Ll8/PL5uXa7u30+vm23dzJ5uX///+19lXXAAAAcXRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AClMwGUAAASkSURBVHja7Jr3XyI7EMAXTmCBpQiICEhTqSrqgWC50zt7Pc92vb5y5bX9/396XpKlaCY72d17n/eD+YnPZiZfNjuZzEyi6P9BU/5nkOR0paYYTQ0UvM5DogvKrZaIP3IWEp5UeG1/2TlI5KECtUOvQ5BZRdBqjx2BHAyNmf298vE0OPho3AHIYW803x8rsbXqzaOU+zofd/WeF21DpoyhxvzaUEes/4bPbULGjYHqf93p6+wbnWFbkLCxJgrc7hnWHfTagLjZFz79BC3RMSqwYAPCPkjIDUp42LvMWYYk2Qg7Apk5NmFrViEVjPHsUaFdi5AIVX8mto2USt3ysTVIkUJWTaz8iIpFLUGqWaK8buoTzolc3BJkh/7DJ6aQAvUImhXILjWbkvmWaTZfAsgVUa0g9oIykZy3AlkkqtMIyLzJx4MhpRBRRexJ+gqRLFuANIMoAyYejEguZeQhycQPTdcDBOQr9XBr8pD3RPNvTKDQoWu+IQ95QPZXHwZCXfGI+x5yD7mH3EMkIc3V2a3tysPD9HzBo/0MSDM6tegayErGWnsv3c5CclcJTpYVDHSdgcRufj6aBLO5+NlN/5lNyFhDj12JckZlqsSCJ+sQtbEZVMQtFH7vsgkpD46nttL+3ZX8eKA9RG7V7EEG2uRbT6rXu/ZyK9TvcjkDufhyfVvgcm5x6E/YhpzwB8idOwf5+AaM/J/ag8R6kBmR3+qqPSsbtQAxlI/E3rHZZnITFiB1pmta1BqNGx9OGtJVsDmQrhuVqogkJMNWwQdMPSz1jK0kSQirqQRwhT2vuGQAQJrUtEYyyCrjB+Z2UjKQtGnafKstiCyRD3lNX+Q3fD2XGfyiBOQVVelKFJhZrecTHtISGgu3aQk4BeZCNFrFmpWB6Bs0caxiITlarfNKQcLwglTgqh8wW6PJKn/5ThCtAhYSFzjfaTWxlBPUdqewkFO4REpDrCRcMtjHQoKwu/uVdOXhj3KOhdDtoQHbUBEu9L2Qgrzg7kEB0ufnLnpi+KoUpJ2ShGjEvIJSkKw05EIKQtzju588XUT6QpOE0A8fwkLo2n0jCaEm3MZCsnDNTgBZAWuWXMhn+BhJANkAtbiQPXiXgyEsvvmOhTyGXT0MWaXnXhp600qA1do66Fa24f2Bv/1SX98CwxiOg2SHRjN4SBQMUamd/nK3Y1cQqfIhlyp4cjI7obzjhGPHqqAADQR3LLfZ5MVkHZ6/mRfFqQCk4aM+4hgZRVyzPEgqTDUC7jSOkVlSREEUBBml/gt16GCYr5KVTYI2WTbwDcEwslOPdDq3zjRzpowCkzyQzxlLbMJMZyzP5Nq6PKR34qqkRTamGWmpL2kFwkLiH1E0nAFHRwwhwWmO8Fh2s1dtCPDPas7iPQlRliw+xc71ixr1O7dHquH+JZBgR7cM0Zd9fUx5xtN3KKXl8exAHSyi24DoyaGLN+rndDH/6m1xe6E2+Hhd021BdN1vUh1UfGb3MDD3Vnb+ETLq5gkZ6ppPF77ms+FB6CMvLHkGK469lvVHUNroq1eZsL88WEKt7T9dxupK3VQrdY7yJ3sHWyd/RiOXEnr/CjAAN8ayPakDXc8AAAAASUVORK5CYII="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <div class="flex-1 mr10 display_flex">
              <input
                v-model="changePwdParams.code"
                type="text"
                placeholder="请输入验证码"
                class="widthfull"
              ></div>
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
            <div
              @click="!timer && getCodeEmail()"
              class="cursor cursor-pointer sendCodeBa sendCodeYes"
            >{{timer ? timerCount + 'S后重新获取' : '发送验证码'}}</div>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NkJGMzFBQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NkJGMzFCQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg2QkYzMThBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg2QkYzMTlBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4UFSoMAAABUFBMVEWz29q33dzF5OO63t32+/u13Nu94N/z+fn0+vq23dzE4+Lt9vbZ7e3F4+Ps9vbo9PT1+vr7/f3A4eDu9/fy+fm03Nvg8PC029ri8fHq9fXB4uHk8vLD4+K53t3J5eX8/v6/4eD5/PzM5+bT6urp9fTY7ezf8O/+///S6unG5OPC4uHe7+/w+Pj0+vnb7u2839623Nvj8vHQ6ejj8vLW6+vD4uLl8/PC4uLZ7ezW7Ov3+/vO6Oe43dzH5eTr9vXI5eTU6+rm8/PH5OTL5ubt9/bP6Of4/Pzh8fDK5uXV6+r9/v7L5uXc7+7V6+u7397v9/fB4eHn8/O6397p9PTx+Pj6/Pzn9PPX7Ozc7u7a7e3Y7Oz8/f3R6enP6Oi+4N/b7u7f8PDy+fjd7+/4+/vN5+bR6ejx+fjv+Pfh8fHd7+76/f3l8/Ln9PTa7u3r9fX///8FI2pHAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAA7FJREFUeNrsmld34jAQRg0EQsCJMTV0AgFCCCWB0EJ675ue7b0X/v/bJhoDXrCNbMm7nLN8Txw0owuWNBqNzLT+gphhgzTspWz+7i6fCrr2dIHMVDYCBqajZvWwMkMXkubiYaZP4fgsPUg65WRkFCpRgqwtMwqyrdGAHDIDdEgMiUZE3XmqkXgin0/EI1Wf6OtIlAzChzpdBeYq7m6DO7gU644MTwLh59v9HHN9jUebx+3WeZ4AYmz/C5m5OhsQDCa1Q54JXZzKPvRoWTCZ0wq5Fjq4V/L3CkZXGiHCgHxVfhQlsDp7rgmyCN4bg+ZnEuxqmiAwRQODlxpEBAOvAeKHH7gzGOKGlenVAHmJPDM48W9pkKkc5MiEPH/gQN5C0HmvGjKFHAt4+4UNGS+qhjzFm1qgFDJ+oRoC0beCB3EhY6dqiAX5uTETALT7m3mVkD3Po1sRM1dIw5r6rBKyAOMebakZ+VuVkB3YJ3BzngNkHlQJgfW+jguB5fhFJWQWeW3jQhLKgUURcoALmdMEsSOvOC7kVMuY3ASR15Z1HEuOFWT++iaNC3Hsr8cum8jLN2HGkgGCffHy1WTKjQFxJAwMkcwfrYMgJ4QItEeeKEMSDBUllCArDCWtyEOyHaNCyKhBNkung6wcxNVO3stT37QdQHkX2x5TlwxESOacCyQHXUeG6d/BuhAOWpdnWkQ6goj8x47fhayjNhMh40FPUEextASkYUZt38lLA8LYLkhAIPWN0ShAwLGGlYBAtK7TgLyBo6QEBBbiBQ0IPC+bBGQVtazRgLg9PZO4AwnhJvEYawWtSIssxE4DYp2Qg9iGA5LzT3Xkz+kEqYuDeV0nSFIMSeoEYcUQdgQZQUYQKdXEkJpOkLIYUtYrQHIch2rdzocPOR1DPdo/V3XeTyYxaqcKkDME8esLuZp+1J6+EDyNIP8pxNaT5eoCsfS46wLZzHq92U2dIYRp6gjyryDyh6D9GsuySQeVf1KUg8ARn6NyZuy9Q+pAdpVrlWoE1yJGCUgd474QUz9RVx8kIFDTDvMUIHB9vy8BiZoGnqAwNQ1VszGpKQyD4vtFyrguQk1ZshT1CVLD4jkZI1dg+pIr0WKMCxXXFAmjJLyxsS1THnS03+hYZu3jjTHValhd95l2bdghV021d/NpX9OgWk1z198vXxe+oFUX9ipVuM/DNBCeW8Uyesu6Tc7Y6qv59oV6zugjQlSn+6ecxH4y/m4pYzFpUMG4m5esXA/d+13DDfktwADawgsH+mEKOwAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="changePwdParams.password"
              type="password"
              placeholder="请输入原始密码"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NkJGMzFBQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NkJGMzFCQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg2QkYzMThBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg2QkYzMTlBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4UFSoMAAABUFBMVEWz29q33dzF5OO63t32+/u13Nu94N/z+fn0+vq23dzE4+Lt9vbZ7e3F4+Ps9vbo9PT1+vr7/f3A4eDu9/fy+fm03Nvg8PC029ri8fHq9fXB4uHk8vLD4+K53t3J5eX8/v6/4eD5/PzM5+bT6urp9fTY7ezf8O/+///S6unG5OPC4uHe7+/w+Pj0+vnb7u2839623Nvj8vHQ6ejj8vLW6+vD4uLl8/PC4uLZ7ezW7Ov3+/vO6Oe43dzH5eTr9vXI5eTU6+rm8/PH5OTL5ubt9/bP6Of4/Pzh8fDK5uXV6+r9/v7L5uXc7+7V6+u7397v9/fB4eHn8/O6397p9PTx+Pj6/Pzn9PPX7Ozc7u7a7e3Y7Oz8/f3R6enP6Oi+4N/b7u7f8PDy+fjd7+/4+/vN5+bR6ejx+fjv+Pfh8fHd7+76/f3l8/Ln9PTa7u3r9fX///8FI2pHAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAA7FJREFUeNrsmld34jAQRg0EQsCJMTV0AgFCCCWB0EJ675ue7b0X/v/bJhoDXrCNbMm7nLN8Txw0owuWNBqNzLT+gphhgzTspWz+7i6fCrr2dIHMVDYCBqajZvWwMkMXkubiYaZP4fgsPUg65WRkFCpRgqwtMwqyrdGAHDIDdEgMiUZE3XmqkXgin0/EI1Wf6OtIlAzChzpdBeYq7m6DO7gU644MTwLh59v9HHN9jUebx+3WeZ4AYmz/C5m5OhsQDCa1Q54JXZzKPvRoWTCZ0wq5Fjq4V/L3CkZXGiHCgHxVfhQlsDp7rgmyCN4bg+ZnEuxqmiAwRQODlxpEBAOvAeKHH7gzGOKGlenVAHmJPDM48W9pkKkc5MiEPH/gQN5C0HmvGjKFHAt4+4UNGS+qhjzFm1qgFDJ+oRoC0beCB3EhY6dqiAX5uTETALT7m3mVkD3Po1sRM1dIw5r6rBKyAOMebakZ+VuVkB3YJ3BzngNkHlQJgfW+jguB5fhFJWQWeW3jQhLKgUURcoALmdMEsSOvOC7kVMuY3ASR15Z1HEuOFWT++iaNC3Hsr8cum8jLN2HGkgGCffHy1WTKjQFxJAwMkcwfrYMgJ4QItEeeKEMSDBUllCArDCWtyEOyHaNCyKhBNkung6wcxNVO3stT37QdQHkX2x5TlwxESOacCyQHXUeG6d/BuhAOWpdnWkQ6goj8x47fhayjNhMh40FPUEextASkYUZt38lLA8LYLkhAIPWN0ShAwLGGlYBAtK7TgLyBo6QEBBbiBQ0IPC+bBGQVtazRgLg9PZO4AwnhJvEYawWtSIssxE4DYp2Qg9iGA5LzT3Xkz+kEqYuDeV0nSFIMSeoEYcUQdgQZQUYQKdXEkJpOkLIYUtYrQHIch2rdzocPOR1DPdo/V3XeTyYxaqcKkDME8esLuZp+1J6+EDyNIP8pxNaT5eoCsfS46wLZzHq92U2dIYRp6gjyryDyh6D9GsuySQeVf1KUg8ARn6NyZuy9Q+pAdpVrlWoE1yJGCUgd474QUz9RVx8kIFDTDvMUIHB9vy8BiZoGnqAwNQ1VszGpKQyD4vtFyrguQk1ZshT1CVLD4jkZI1dg+pIr0WKMCxXXFAmjJLyxsS1THnS03+hYZu3jjTHValhd95l2bdghV021d/NpX9OgWk1z198vXxe+oFUX9ipVuM/DNBCeW8Uyesu6Tc7Y6qv59oV6zugjQlSn+6ecxH4y/m4pYzFpUMG4m5esXA/d+13DDfktwADawgsH+mEKOwAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="changePwdParams.newpassword"
              type="password"
              placeholder="请输入新密码"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NkJGMzFBQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NkJGMzFCQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg2QkYzMThBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg2QkYzMTlBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4UFSoMAAABUFBMVEWz29q33dzF5OO63t32+/u13Nu94N/z+fn0+vq23dzE4+Lt9vbZ7e3F4+Ps9vbo9PT1+vr7/f3A4eDu9/fy+fm03Nvg8PC029ri8fHq9fXB4uHk8vLD4+K53t3J5eX8/v6/4eD5/PzM5+bT6urp9fTY7ezf8O/+///S6unG5OPC4uHe7+/w+Pj0+vnb7u2839623Nvj8vHQ6ejj8vLW6+vD4uLl8/PC4uLZ7ezW7Ov3+/vO6Oe43dzH5eTr9vXI5eTU6+rm8/PH5OTL5ubt9/bP6Of4/Pzh8fDK5uXV6+r9/v7L5uXc7+7V6+u7397v9/fB4eHn8/O6397p9PTx+Pj6/Pzn9PPX7Ozc7u7a7e3Y7Oz8/f3R6enP6Oi+4N/b7u7f8PDy+fjd7+/4+/vN5+bR6ejx+fjv+Pfh8fHd7+76/f3l8/Ln9PTa7u3r9fX///8FI2pHAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAA7FJREFUeNrsmld34jAQRg0EQsCJMTV0AgFCCCWB0EJ675ue7b0X/v/bJhoDXrCNbMm7nLN8Txw0owuWNBqNzLT+gphhgzTspWz+7i6fCrr2dIHMVDYCBqajZvWwMkMXkubiYaZP4fgsPUg65WRkFCpRgqwtMwqyrdGAHDIDdEgMiUZE3XmqkXgin0/EI1Wf6OtIlAzChzpdBeYq7m6DO7gU644MTwLh59v9HHN9jUebx+3WeZ4AYmz/C5m5OhsQDCa1Q54JXZzKPvRoWTCZ0wq5Fjq4V/L3CkZXGiHCgHxVfhQlsDp7rgmyCN4bg+ZnEuxqmiAwRQODlxpEBAOvAeKHH7gzGOKGlenVAHmJPDM48W9pkKkc5MiEPH/gQN5C0HmvGjKFHAt4+4UNGS+qhjzFm1qgFDJ+oRoC0beCB3EhY6dqiAX5uTETALT7m3mVkD3Po1sRM1dIw5r6rBKyAOMebakZ+VuVkB3YJ3BzngNkHlQJgfW+jguB5fhFJWQWeW3jQhLKgUURcoALmdMEsSOvOC7kVMuY3ASR15Z1HEuOFWT++iaNC3Hsr8cum8jLN2HGkgGCffHy1WTKjQFxJAwMkcwfrYMgJ4QItEeeKEMSDBUllCArDCWtyEOyHaNCyKhBNkung6wcxNVO3stT37QdQHkX2x5TlwxESOacCyQHXUeG6d/BuhAOWpdnWkQ6goj8x47fhayjNhMh40FPUEextASkYUZt38lLA8LYLkhAIPWN0ShAwLGGlYBAtK7TgLyBo6QEBBbiBQ0IPC+bBGQVtazRgLg9PZO4AwnhJvEYawWtSIssxE4DYp2Qg9iGA5LzT3Xkz+kEqYuDeV0nSFIMSeoEYcUQdgQZQUYQKdXEkJpOkLIYUtYrQHIch2rdzocPOR1DPdo/V3XeTyYxaqcKkDME8esLuZp+1J6+EDyNIP8pxNaT5eoCsfS46wLZzHq92U2dIYRp6gjyryDyh6D9GsuySQeVf1KUg8ARn6NyZuy9Q+pAdpVrlWoE1yJGCUgd474QUz9RVx8kIFDTDvMUIHB9vy8BiZoGnqAwNQ1VszGpKQyD4vtFyrguQk1ZshT1CVLD4jkZI1dg+pIr0WKMCxXXFAmjJLyxsS1THnS03+hYZu3jjTHValhd95l2bdghV021d/NpX9OgWk1z198vXxe+oFUX9ipVuM/DNBCeW8Uyesu6Tc7Y6qv59oV6zugjQlSn+6ecxH4y/m4pYzFpUMG4m5esXA/d+13DDfktwADawgsH+mEKOwAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="changePwdParams.qpassword"
              type="password"
              placeholder="请输入确认密码"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="mt20 loginParameter_input"><button
            @click="changePwd"
            class="colorfff text_center cursor"
          >确认修改</button></div>
      </div>
    </el-dialog>

    <!-- 提币 -->
    <el-dialog
      title="提币"
      width="370px"
      :visible.sync="dialogFormVisible2"
    >
      <div class="loginParameter security_alert ">
        <div class="login_list"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDN0RCNjIyQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDN0RCNjIzQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEM3REI2MjBBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEM3REI2MjFBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wxEmeAAABX1BMVEWz29rA4eC63t3H5OTZ7e3O6Oe94N/7/f39/v6/4eC7397Q6ej+//+23NvM5+bI5eTU6+rR6em8396+4N/K5uXP6Oj8/v7w+Pj3+/v2+/u43dzL5ubG5OO53t3q9fW029rT6ur5/PzB4eHJ5uXt9va33dzE4+LS6unC4uHN5+f+/v78/f3N5+b1+vrL5+a+4OC03NvF5OPp9fTL5uXu9/e13Nv4/PzJ5eXx+PjC4uLj8vHf8O/v9/fz+fnh8fC23dzV6+vy+fjk8vK6397s9vbd7+7W7Ovy+fno9PTY7eza7e3Z7ezx+fjR6ei43t3i8fH6/Pzl8/PD4uLn9PPB4uHA4eH0+vrY7Ozg8PDD4+Lh8fHf8PDl8/Lc7u7P6Ofj8vLt9/bH5eTn8/P6/f34+/ve7+/X7Ovm8/Pb7u7a7u3b7u3v+Pfw+PfX7Ozr9fXF4+Pn9PTV6+rW6+vp9PT///+ukfZ3AAAAdXRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCbsN7qAAAD90lEQVR42uzZ91/aQBQA8AMMQ1EcyBJEQAEH4sJtXbVua91Wa/fe7fv/P43JvUBCEi6Dfj79NO8nQ3L5Jube3cuFwF8I4iAO4iAO4iD/CfK+zz1B7I+huaiERPOkabFDkZWh5hnE7ROQYA9pZjwXkMdNNQgnIFlxo6fo3txsFaNbCK8UPXyUywExXEyRDSXE87oEpF3cuI6BT4zR0Ugk4hdiZCTIh6l+2++mD0VA8L5cs3bmxpX05GUIcUftMy6JBkJWB+0yBogmQsgTe4w7ooeQLRsIX4ioIznaF8gjy0b8jJ4qdaZANtZpTyaHFo35TXqi1nVOgezBTIru7PNbMR7ixQbi4FEg+wDbXrp78rV5YyeNJzkGSCqQFv6A2AJeRMmssYiPO3z/7/CoINVu4T4wZzxDY1jYVEUgOE0PSsyYMdbQ6AIdBKCXHtbeb9zoQmMP9BH4ikc+NWqM1bXUROBGeT1sEcHnOTEFjRH4gUqnkTTP4tNcBhYEBldpgzb2NG+lTbzbwIZAFJuEIwbTfEE28ekiUHLRRicxFuNUSsERYEdg9CWOcvONjQdo9Cp2NEAAOjBhGs6WLWgMgFEE2mjT9BRjCl6CcQQ6sfWGnsHhUUtgBoEPDHNyHx5zC+aQagH7S4MY9dADKt/ALAJTafmwqkzzc7r7aBnMIzBDC1oyprJTytnABVhBYCVATxTyKXcN4muNJwPWEIhgfXFe0pjNezR7BTOy1i5VaZ9V05ys7lpFemtqwYl+lTTXmxMYEU7+1nRbl+ZiFKwgOIDhoEzeivVGmG4WC7ozDxOC6Tw+Ij2Bd/zPfpxpvW+kW+LMIngf0/zfG9Xh3I9v/fn7rluQVVqGEaw+wmLy44oFl8T788vedzgzyDBtnMMpVrGkcKgs6TjjCKcw+OT31ho17zH7WkojhJP9r8SYPakan9RKYM4YgkaH7Fe/NHvcyA9fUh9G9RFOq8sUNN5fF1UvShfhtDvM/ZxcUSnGX9V0dyZkWKPCEVczBgqqawr9dFAOBZmQDsNFqji9VMRmyQgDEjZn8LMonRTyvobInFkDYJmma/G4AWLBAPhCK4JsRhfJWTH40iIhW9VSR8J6/YolDo5o/RLTRPr0Jge22KZrNOWYBjJu9T7u44IOo954/YrEbtVoA0sRo3N1d7wOuZJysMvqUlSGrp50x+4UyFan1puMiUW1SVr1XSuQhInXas0IzukuD9pi1Ix/ashP25ZsOQXSrjZvWw6pxkzVrtUL3djG6JQhHxH5XnTZF8V8da7kkUyqqZ82Xohfgk6baeTwm9bvSvO+NpWkr3PrySYZoXjtd8bFybT9RHnJ+SzrIA7iIP8u8keAAQDk72xp1NGk9AAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="withdrawParams.address"
              type="text"
              placeholder="请输入地址"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDN0RCNjIyQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDN0RCNjIzQTBCMjExRUJBRDMwRjRGRjM1M0I4NkMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEM3REI2MjBBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEM3REI2MjFBMEIyMTFFQkFEMzBGNEZGMzUzQjg2QzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wxEmeAAABX1BMVEWz29rA4eC63t3H5OTZ7e3O6Oe94N/7/f39/v6/4eC7397Q6ej+//+23NvM5+bI5eTU6+rR6em8396+4N/K5uXP6Oj8/v7w+Pj3+/v2+/u43dzL5ubG5OO53t3q9fW029rT6ur5/PzB4eHJ5uXt9va33dzE4+LS6unC4uHN5+f+/v78/f3N5+b1+vrL5+a+4OC03NvF5OPp9fTL5uXu9/e13Nv4/PzJ5eXx+PjC4uLj8vHf8O/v9/fz+fnh8fC23dzV6+vy+fjk8vK6397s9vbd7+7W7Ovy+fno9PTY7eza7e3Z7ezx+fjR6ei43t3i8fH6/Pzl8/PD4uLn9PPB4uHA4eH0+vrY7Ozg8PDD4+Lh8fHf8PDl8/Lc7u7P6Ofj8vLt9/bH5eTn8/P6/f34+/ve7+/X7Ovm8/Pb7u7a7u3b7u3v+Pfw+PfX7Ozr9fXF4+Pn9PTV6+rW6+vp9PT///+ukfZ3AAAAdXRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCbsN7qAAAD90lEQVR42uzZ91/aQBQA8AMMQ1EcyBJEQAEH4sJtXbVua91Wa/fe7fv/P43JvUBCEi6Dfj79NO8nQ3L5Jube3cuFwF8I4iAO4iAO4iD/CfK+zz1B7I+huaiERPOkabFDkZWh5hnE7ROQYA9pZjwXkMdNNQgnIFlxo6fo3txsFaNbCK8UPXyUywExXEyRDSXE87oEpF3cuI6BT4zR0Ugk4hdiZCTIh6l+2++mD0VA8L5cs3bmxpX05GUIcUftMy6JBkJWB+0yBogmQsgTe4w7ooeQLRsIX4ioIznaF8gjy0b8jJ4qdaZANtZpTyaHFo35TXqi1nVOgezBTIru7PNbMR7ixQbi4FEg+wDbXrp78rV5YyeNJzkGSCqQFv6A2AJeRMmssYiPO3z/7/CoINVu4T4wZzxDY1jYVEUgOE0PSsyYMdbQ6AIdBKCXHtbeb9zoQmMP9BH4ikc+NWqM1bXUROBGeT1sEcHnOTEFjRH4gUqnkTTP4tNcBhYEBldpgzb2NG+lTbzbwIZAFJuEIwbTfEE28ekiUHLRRicxFuNUSsERYEdg9CWOcvONjQdo9Cp2NEAAOjBhGs6WLWgMgFEE2mjT9BRjCl6CcQQ6sfWGnsHhUUtgBoEPDHNyHx5zC+aQagH7S4MY9dADKt/ALAJTafmwqkzzc7r7aBnMIzBDC1oyprJTytnABVhBYCVATxTyKXcN4muNJwPWEIhgfXFe0pjNezR7BTOy1i5VaZ9V05ys7lpFemtqwYl+lTTXmxMYEU7+1nRbl+ZiFKwgOIDhoEzeivVGmG4WC7ozDxOC6Tw+Ij2Bd/zPfpxpvW+kW+LMIngf0/zfG9Xh3I9v/fn7rluQVVqGEaw+wmLy44oFl8T788vedzgzyDBtnMMpVrGkcKgs6TjjCKcw+OT31ho17zH7WkojhJP9r8SYPakan9RKYM4YgkaH7Fe/NHvcyA9fUh9G9RFOq8sUNN5fF1UvShfhtDvM/ZxcUSnGX9V0dyZkWKPCEVczBgqqawr9dFAOBZmQDsNFqji9VMRmyQgDEjZn8LMonRTyvobInFkDYJmma/G4AWLBAPhCK4JsRhfJWTH40iIhW9VSR8J6/YolDo5o/RLTRPr0Jge22KZrNOWYBjJu9T7u44IOo954/YrEbtVoA0sRo3N1d7wOuZJysMvqUlSGrp50x+4UyFan1puMiUW1SVr1XSuQhInXas0IzukuD9pi1Ix/ashP25ZsOQXSrjZvWw6pxkzVrtUL3djG6JQhHxH5XnTZF8V8da7kkUyqqZ82Xohfgk6baeTwm9bvSvO+NpWkr3PrySYZoXjtd8bFybT9RHnJ+SzrIA7iIP8u8keAAQDk72xp1NGk9AAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <input
              v-model="withdrawParams.balance"
              type="text"
              placeholder="请输入金额"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCQ0IwMUZDQTBCMjExRUI5OTcyODE1OTAyMzRENUMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCQ0IwMUZEQTBCMjExRUI5OTcyODE1OTAyMzRENUMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUJDQjAxRkFBMEIyMTFFQjk5NzI4MTU5MDIzNEQ1QzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUJDQjAxRkJBMEIyMTFFQjk5NzI4MTU5MDIzNEQ1QzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz53jkr1AAABU1BMVEWz29q029r5/Pzy+fm6397t9/b1+vq23Nu63t3X7OvO6Oe33dz3+/u7397o9PTx+Pjk8vL7/f30+vrI5eS03Nu13Nvz+fnW7Ov+/v653t3Q6ej9/v6/4eDD4+Ln9PPa7e3g8PDV6+v6/f3R6ene7+/Y7ezC4uHL5ub+//+43dzN5+f4/Pzf8O/h8fDV6+r2+/vF4+PC4uK+4ODJ5eXE4+LA4eDr9vXu9/fq9fXd7+7s9vb6/PzK5uXn9PTm8/PN5+bj8vHp9fTZ7ezU6+rP6Ojw+Pjb7u3T6urH5OTS6unM5+bi8fH8/v7X7Oy+4N/A4eHt9vbc7u7B4uG43t38/f3L5+bx+fi94N/n8/Pc7+74+/vw+PfZ7e28397y+fjh8fHF5OPv9/fG5OPv+PfR6ejB4eHH5eTW6+vr9fXl8/Ll8/PL5uXa7u30+vm23dzJ5uX///+19lXXAAAAcXRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AClMwGUAAASkSURBVHja7Jr3XyI7EMAXTmCBpQiICEhTqSrqgWC50zt7Pc92vb5y5bX9/396XpKlaCY72d17n/eD+YnPZiZfNjuZzEyi6P9BU/5nkOR0paYYTQ0UvM5DogvKrZaIP3IWEp5UeG1/2TlI5KECtUOvQ5BZRdBqjx2BHAyNmf298vE0OPho3AHIYW803x8rsbXqzaOU+zofd/WeF21DpoyhxvzaUEes/4bPbULGjYHqf93p6+wbnWFbkLCxJgrc7hnWHfTagLjZFz79BC3RMSqwYAPCPkjIDUp42LvMWYYk2Qg7Apk5NmFrViEVjPHsUaFdi5AIVX8mto2USt3ysTVIkUJWTaz8iIpFLUGqWaK8buoTzolc3BJkh/7DJ6aQAvUImhXILjWbkvmWaTZfAsgVUa0g9oIykZy3AlkkqtMIyLzJx4MhpRBRRexJ+gqRLFuANIMoAyYejEguZeQhycQPTdcDBOQr9XBr8pD3RPNvTKDQoWu+IQ95QPZXHwZCXfGI+x5yD7mH3EMkIc3V2a3tysPD9HzBo/0MSDM6tegayErGWnsv3c5CclcJTpYVDHSdgcRufj6aBLO5+NlN/5lNyFhDj12JckZlqsSCJ+sQtbEZVMQtFH7vsgkpD46nttL+3ZX8eKA9RG7V7EEG2uRbT6rXu/ZyK9TvcjkDufhyfVvgcm5x6E/YhpzwB8idOwf5+AaM/J/ag8R6kBmR3+qqPSsbtQAxlI/E3rHZZnITFiB1pmta1BqNGx9OGtJVsDmQrhuVqogkJMNWwQdMPSz1jK0kSQirqQRwhT2vuGQAQJrUtEYyyCrjB+Z2UjKQtGnafKstiCyRD3lNX+Q3fD2XGfyiBOQVVelKFJhZrecTHtISGgu3aQk4BeZCNFrFmpWB6Bs0caxiITlarfNKQcLwglTgqh8wW6PJKn/5ThCtAhYSFzjfaTWxlBPUdqewkFO4REpDrCRcMtjHQoKwu/uVdOXhj3KOhdDtoQHbUBEu9L2Qgrzg7kEB0ufnLnpi+KoUpJ2ShGjEvIJSkKw05EIKQtzju588XUT6QpOE0A8fwkLo2n0jCaEm3MZCsnDNTgBZAWuWXMhn+BhJANkAtbiQPXiXgyEsvvmOhTyGXT0MWaXnXhp600qA1do66Fa24f2Bv/1SX98CwxiOg2SHRjN4SBQMUamd/nK3Y1cQqfIhlyp4cjI7obzjhGPHqqAADQR3LLfZ5MVkHZ6/mRfFqQCk4aM+4hgZRVyzPEgqTDUC7jSOkVlSREEUBBml/gt16GCYr5KVTYI2WTbwDcEwslOPdDq3zjRzpowCkzyQzxlLbMJMZyzP5Nq6PKR34qqkRTamGWmpL2kFwkLiH1E0nAFHRwwhwWmO8Fh2s1dtCPDPas7iPQlRliw+xc71ixr1O7dHquH+JZBgR7cM0Zd9fUx5xtN3KKXl8exAHSyi24DoyaGLN+rndDH/6m1xe6E2+Hhd021BdN1vUh1UfGb3MDD3Vnb+ETLq5gkZ6ppPF77ms+FB6CMvLHkGK469lvVHUNroq1eZsL88WEKt7T9dxupK3VQrdY7yJ3sHWyd/RiOXEnr/CjAAN8ayPakDXc8AAAAASUVORK5CYII="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input">
            <div class="flex-1 mr10 display_flex">
              <input
                v-model="withdrawParams.code"
                type="text"
                placeholder="请输入验证码"
                class="widthfull"
              ></div>
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
            <div
              @click="!timer && getCodeEmail(1)"
              class="cursor cursor-pointer sendCodeBa sendCodeYes"
            >{{timer ? timerCount + 'S后重新获取' : '发送验证码'}}</div>
          </div>
        </div>
        <div class="new_introduct">
          <p><span>•</span> 最小提币数量0.2PHA。</p>
          <p><span>•</span> 您的提币数量中包含用于转账的手续费。</p>
          <p><span>•</span> 请勿向上述地址充值任何非 PHA 资产，否则资产将不可找回。</p>
          <p><span>•</span> 您的充值地址不会经常改变，可以重复充值。</p>
          <p><span>•</span> 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
        </div>
        <!-- <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NkJGMzFBQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NkJGMzFCQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg2QkYzMThBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg2QkYzMTlBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4UFSoMAAABUFBMVEWz29q33dzF5OO63t32+/u13Nu94N/z+fn0+vq23dzE4+Lt9vbZ7e3F4+Ps9vbo9PT1+vr7/f3A4eDu9/fy+fm03Nvg8PC029ri8fHq9fXB4uHk8vLD4+K53t3J5eX8/v6/4eD5/PzM5+bT6urp9fTY7ezf8O/+///S6unG5OPC4uHe7+/w+Pj0+vnb7u2839623Nvj8vHQ6ejj8vLW6+vD4uLl8/PC4uLZ7ezW7Ov3+/vO6Oe43dzH5eTr9vXI5eTU6+rm8/PH5OTL5ubt9/bP6Of4/Pzh8fDK5uXV6+r9/v7L5uXc7+7V6+u7397v9/fB4eHn8/O6397p9PTx+Pj6/Pzn9PPX7Ozc7u7a7e3Y7Oz8/f3R6enP6Oi+4N/b7u7f8PDy+fjd7+/4+/vN5+bR6ejx+fjv+Pfh8fHd7+76/f3l8/Ln9PTa7u3r9fX///8FI2pHAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAA7FJREFUeNrsmld34jAQRg0EQsCJMTV0AgFCCCWB0EJ675ue7b0X/v/bJhoDXrCNbMm7nLN8Txw0owuWNBqNzLT+gphhgzTspWz+7i6fCrr2dIHMVDYCBqajZvWwMkMXkubiYaZP4fgsPUg65WRkFCpRgqwtMwqyrdGAHDIDdEgMiUZE3XmqkXgin0/EI1Wf6OtIlAzChzpdBeYq7m6DO7gU644MTwLh59v9HHN9jUebx+3WeZ4AYmz/C5m5OhsQDCa1Q54JXZzKPvRoWTCZ0wq5Fjq4V/L3CkZXGiHCgHxVfhQlsDp7rgmyCN4bg+ZnEuxqmiAwRQODlxpEBAOvAeKHH7gzGOKGlenVAHmJPDM48W9pkKkc5MiEPH/gQN5C0HmvGjKFHAt4+4UNGS+qhjzFm1qgFDJ+oRoC0beCB3EhY6dqiAX5uTETALT7m3mVkD3Po1sRM1dIw5r6rBKyAOMebakZ+VuVkB3YJ3BzngNkHlQJgfW+jguB5fhFJWQWeW3jQhLKgUURcoALmdMEsSOvOC7kVMuY3ASR15Z1HEuOFWT++iaNC3Hsr8cum8jLN2HGkgGCffHy1WTKjQFxJAwMkcwfrYMgJ4QItEeeKEMSDBUllCArDCWtyEOyHaNCyKhBNkung6wcxNVO3stT37QdQHkX2x5TlwxESOacCyQHXUeG6d/BuhAOWpdnWkQ6goj8x47fhayjNhMh40FPUEextASkYUZt38lLA8LYLkhAIPWN0ShAwLGGlYBAtK7TgLyBo6QEBBbiBQ0IPC+bBGQVtazRgLg9PZO4AwnhJvEYawWtSIssxE4DYp2Qg9iGA5LzT3Xkz+kEqYuDeV0nSFIMSeoEYcUQdgQZQUYQKdXEkJpOkLIYUtYrQHIch2rdzocPOR1DPdo/V3XeTyYxaqcKkDME8esLuZp+1J6+EDyNIP8pxNaT5eoCsfS46wLZzHq92U2dIYRp6gjyryDyh6D9GsuySQeVf1KUg8ARn6NyZuy9Q+pAdpVrlWoE1yJGCUgd474QUz9RVx8kIFDTDvMUIHB9vy8BiZoGnqAwNQ1VszGpKQyD4vtFyrguQk1ZshT1CVLD4jkZI1dg+pIr0WKMCxXXFAmjJLyxsS1THnS03+hYZu3jjTHValhd95l2bdghV021d/NpX9OgWk1z198vXxe+oFUX9ipVuM/DNBCeW8Uyesu6Tc7Y6qv59oV6zugjQlSn+6ecxH4y/m4pYzFpUMG4m5esXA/d+13DDfktwADawgsH+mEKOwAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input"><input
              type="password"
              placeholder="请输入登录密码"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div>
        <div class="login_list mt10"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4NkJGMzFBQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4NkJGMzFCQTBCMzExRUI5QTVGREFCMEEwNURGN0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg2QkYzMThBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg2QkYzMTlBMEIzMTFFQjlBNUZEQUIwQTA1REY3QzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4UFSoMAAABUFBMVEWz29q33dzF5OO63t32+/u13Nu94N/z+fn0+vq23dzE4+Lt9vbZ7e3F4+Ps9vbo9PT1+vr7/f3A4eDu9/fy+fm03Nvg8PC029ri8fHq9fXB4uHk8vLD4+K53t3J5eX8/v6/4eD5/PzM5+bT6urp9fTY7ezf8O/+///S6unG5OPC4uHe7+/w+Pj0+vnb7u2839623Nvj8vHQ6ejj8vLW6+vD4uLl8/PC4uLZ7ezW7Ov3+/vO6Oe43dzH5eTr9vXI5eTU6+rm8/PH5OTL5ubt9/bP6Of4/Pzh8fDK5uXV6+r9/v7L5uXc7+7V6+u7397v9/fB4eHn8/O6397p9PTx+Pj6/Pzn9PPX7Ozc7u7a7e3Y7Oz8/f3R6enP6Oi+4N/b7u7f8PDy+fjd7+/4+/vN5+bR6ejx+fjv+Pfh8fHd7+76/f3l8/Ln9PTa7u3r9fX///8FI2pHAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAA7FJREFUeNrsmld34jAQRg0EQsCJMTV0AgFCCCWB0EJ675ue7b0X/v/bJhoDXrCNbMm7nLN8Txw0owuWNBqNzLT+gphhgzTspWz+7i6fCrr2dIHMVDYCBqajZvWwMkMXkubiYaZP4fgsPUg65WRkFCpRgqwtMwqyrdGAHDIDdEgMiUZE3XmqkXgin0/EI1Wf6OtIlAzChzpdBeYq7m6DO7gU644MTwLh59v9HHN9jUebx+3WeZ4AYmz/C5m5OhsQDCa1Q54JXZzKPvRoWTCZ0wq5Fjq4V/L3CkZXGiHCgHxVfhQlsDp7rgmyCN4bg+ZnEuxqmiAwRQODlxpEBAOvAeKHH7gzGOKGlenVAHmJPDM48W9pkKkc5MiEPH/gQN5C0HmvGjKFHAt4+4UNGS+qhjzFm1qgFDJ+oRoC0beCB3EhY6dqiAX5uTETALT7m3mVkD3Po1sRM1dIw5r6rBKyAOMebakZ+VuVkB3YJ3BzngNkHlQJgfW+jguB5fhFJWQWeW3jQhLKgUURcoALmdMEsSOvOC7kVMuY3ASR15Z1HEuOFWT++iaNC3Hsr8cum8jLN2HGkgGCffHy1WTKjQFxJAwMkcwfrYMgJ4QItEeeKEMSDBUllCArDCWtyEOyHaNCyKhBNkung6wcxNVO3stT37QdQHkX2x5TlwxESOacCyQHXUeG6d/BuhAOWpdnWkQ6goj8x47fhayjNhMh40FPUEextASkYUZt38lLA8LYLkhAIPWN0ShAwLGGlYBAtK7TgLyBo6QEBBbiBQ0IPC+bBGQVtazRgLg9PZO4AwnhJvEYawWtSIssxE4DYp2Qg9iGA5LzT3Xkz+kEqYuDeV0nSFIMSeoEYcUQdgQZQUYQKdXEkJpOkLIYUtYrQHIch2rdzocPOR1DPdo/V3XeTyYxaqcKkDME8esLuZp+1J6+EDyNIP8pxNaT5eoCsfS46wLZzHq92U2dIYRp6gjyryDyh6D9GsuySQeVf1KUg8ARn6NyZuy9Q+pAdpVrlWoE1yJGCUgd474QUz9RVx8kIFDTDvMUIHB9vy8BiZoGnqAwNQ1VszGpKQyD4vtFyrguQk1ZshT1CVLD4jkZI1dg+pIr0WKMCxXXFAmjJLyxsS1THnS03+hYZu3jjTHValhd95l2bdghV021d/NpX9OgWk1z198vXxe+oFUX9ipVuM/DNBCeW8Uyesu6Tc7Y6qv59oV6zugjQlSn+6ecxH4y/m4pYzFpUMG4m5esXA/d+13DDfktwADawgsH+mEKOwAAAABJRU5ErkJggg=="
            class="login_icon"
          >
          <div class="display_flex loginParameter_input"><input
              type="password"
              placeholder="确认密码"
              class="flex-1"
            >
            <p
              class="fontsmall colorred"
              style="display: none;"
            ></p>
          </div>
        </div> -->
        <div class="mt20 loginParameter_input"><button
            @click="withdraw"
            class="colorfff text_center cursor"
          >确认修改</button></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      changePwdParams: {
        "userName": "",
        "password": "",// "原始密码"
        "newpassword": "",// "新密码"
        "qpassword": "",// "确认密码"
        "code": "",// "邮件验证码"
        "type": "",// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
      },
      balanceData: [],
      myWithDrawData: [],
      balanceDetailData: {},
      typeListIndex: 0,
      typeList: [
        "余额流水",
        "提币记录",
        "算力明细",
      ],
      withdrawParams: {
        "address": "",// "收款地址"
        "balance": "",// "提币金额"
        "code": "",// "邮件验证码"
      },
      timer: null,
      timerCount: 60,
    }
  },
  computed: {
    ...mapState(['locale', 'token', 'UserInfo'])
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.balance()
    this.balanceDetail()
    this.myWithDraw()
  },
  methods: {
    clickTypeListIndex (index) {
      this.typeListIndex = index
      if (index == 0) {
        this.balance()
      } else if (index == 1) {
        this.myWithDraw()
      }
    },
    // 提币
    withdraw () {
      let params = {
        "address": this.withdrawParams.address,// "收款地址"
        "balance": this.withdrawParams.balance,// "提币金额"
        "code": this.withdrawParams.code,// "邮件验证码"
      }
      this.$api.userAccount.withdraw(params).then(res => {
        if (res.type == "success") {
          this.$message.success("提币成功")
          this.dialogFormVisible2 = false
          this.balance()
          this.balanceDetail()
          this.myWithDraw()
        }
      })
    },
    myWithDraw () {
      this.$api.userAccount.myWithDraw().then(res => {
        if (res.type == "success") {
          this.myWithDrawData = res.data
        }
      })
    },
    balance () {
      this.$api.userAccount.balance().then(res => {
        if (res.type == "success") {
          this.balanceData = res.data
        }
      })
    },
    balanceDetail () {
      let params = {
        coinName: "PHA"
      }
      this.$api.userAccount.balanceDetail(params).then(res => {
        if (res.type == "success") {
          this.balanceDetailData = res.data
        }
      })
    },
    // 获取邮箱验证码
    getCodeEmail (state) {
      if (!this.UserInfo.userName) {
        return this.$message.error("用户名不能为空")
      }
      let params = {
        "type": state == 1 ? 'withdraw' : "changePwd",
        "email": this.UserInfo.userName,// "用户名"
      }
      this.$api.user.getCodeEmail(params).then(res => {
        if (res.type == "success") {
          this.$message.success("获取验证码成功")
          this.timer = setInterval(() => {
            this.timerCount--
            if (this.timerCount == 0) {
              clearInterval(this.timer)
              this.timer = null
              this.timerCount = 60
            }
          }, 1000);
        }
      })
    },
    logOut () {
      this.$api.user.logOut().then(res => {
        if (res.type == "success") {
          this.visible = false
          this.$message.success("注销成功")
          this.$store.commit("SET_USERINFO", "");
          this.$store.commit("SET_TOKEN", "");
          this.$router.replace(`/${this.locale}`)
        }
      })
    },
    // 修改密码
    changePwd () {
      let params = {
        "userName": this.UserInfo.userName,
        "password": this.$md5(this.changePwdParams.password),// "原始密码"
        "newpassword": this.$md5(this.changePwdParams.newpassword),// "新密码"
        "qpassword": this.$md5(this.changePwdParams.qpassword),// "确认密码"
        "code": this.changePwdParams.code,// "邮件验证码"
        "type": 1,// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
      }
      this.$api.user.changePwd(params).then(res => {
        if (res.type == "success") {
          this.$message.success("密码修改成功")
          this.dialogFormVisible = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.loginParameter {
  border-radius: 30px;
  background-color: #fff;
  overflow: hidden;
  max-width: 390px;
  .login_list {
    margin: 13px 40px 0;
  }

  .login_list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #e5f0e9;
    padding-left: 10px;
    border-radius: 20px;
    margin: 18px 10px 0;
    p {
      position: absolute;
      bottom: -1.05rem;
      left: 0;
      font-size: 10px;
    }

    .colorred {
      color: #e91b1b;
    }
    .fontsmall {
      font-size: small;
    }
  }

  .sendCodeYes {
    background: #5ba6a5 !important;
    color: #fff !important;
    border: 1px solid #5ba6a5 !important;
  }

  .sendCodeBa {
    background: #5ba6a5;
    height: 40px;
    line-height: 40px;
    border: 1px solid #5ba6a5;
    width: 120px;
    text-align: center;
    font-size: 0.9rem;
    color: #fff;
    border-radius: 0 20px 20px 0;
  }
  .cursor {
    cursor: pointer;
  }

  .loginParameter_input {
    position: relative;
  }
  .login_icon {
    height: 18px;
    width: 18px;
    margin: 0 auto;
  }
  .loginParameter_input {
    position: relative;
    input {
      padding-left: 10px;
      margin-right: 20px;
      border-radius: 5px;
      border: 0;
      height: 40px;
      line-height: 40px;
      width: calc(100% - 30px);
      color: #000;
      background-color: #e5f0e9;
      outline: none;
    }
    button {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAASCAIAAADUnqsCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwMTNCRUZCQjkzMTExRUJCODY0RDNCMDBFNTMyRTUyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwMTNCRUZDQjkzMTExRUJCODY0RDNCMDBFNTMyRTUyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDAxM0JFRjlCOTMxMTFFQkI4NjREM0IwMEU1MzJFNTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDAxM0JFRkFCOTMxMTFFQkI4NjREM0IwMEU1MzJFNTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FyxJuAAAA1UlEQVR42uyVUQ6EIAxEadL732MvsNfrJiZriIFSENfBnX4Z1KbwnKek1zutUrJfWWU9X7TG61K8a+Weebd2H6vOJjY+0ndFn8PJg9R/vvHDjcOOjuRSB2UmU8K0dRgO04HTrD7lr63NKe+pi4Xp0dJr73R7Uhfg9DfSq0G61Y2U3iinfCSl9HCkV4N0fc4ovRlhckopPRzpBUspPRzpXcCM0vthmE4wo/QwOLnMKL37pNfDjNLDC5PLTIzSw+d0YEbpoUiv839G6SVoTkE3Unqg9RFgAB810DB87jXYAAAAAElFTkSuQmCC)
        no-repeat 50%;
      background-size: 100% 100%;
      height: 32px;
      line-height: 32px;
      border-radius: 20px;
      border: 0;
      width: 60%;
      display: inherit;
      margin: 32px auto;
    }

    .colorfff {
      color: #fff !important;
    }
    .text_center {
      text-align: center;
    }
  }

  .login_list .loginParameter_input {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .display_flex,
  .display_flex_both {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .new_introduct {
    border: 2px dashed #69b5ad;
    margin: 10px;
    padding: 10px;
    p {
      font-size: 12px;
      color: #426160;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 20px;
    }
    span {
      font-size: 25px;
      margin-right: 5px;
    }
  }
  .new_introduct {
    margin: 20px 10px;
  }
}
.mt10 {
  margin-top: 15px;
}
</style>